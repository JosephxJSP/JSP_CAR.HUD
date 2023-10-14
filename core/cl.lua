local isInVehicle = false
local seatbeltOn = false

Citizen.CreateThread(function()
    Wait(1000)
    while true do
        local veh = GetVehiclePedIsIn(PlayerPedId())
        if veh ~= 0 and not isInVehicle then
            startLoopSeatbelt()
            startLoopSendData()
        end
        Wait(500)
    end
end)

startLoopSendData = function()
    isInVehicle = true
    SendNUIMessage({ action = "open" })

    Citizen.CreateThread(function()
        while isInVehicle do
            local ped = PlayerPedId()
            local veh = GetVehiclePedIsIn(ped)

            if veh ~= 0 then
                local vehData = {}
                vehData.fuel = math.floor(GetVehicleFuelLevel(veh))
                vehData.speed = math.floor(GetEntitySpeed(veh) * 3.6)
                vehData.rpm = math.floor(GetVehicleCurrentRpm(veh) * 105)
                vehData.engine = math.floor(GetVehicleEngineHealth(veh) / 10)
                vehData.gear = GetVehicleCurrentGear(veh)
                vehData.type = getVehType2NUI(GetVehicleClass(veh))
                vehData.wheel1 = getVehWheelStatus2NUI(veh, 0)
                vehData.wheel2 = getVehWheelStatus2NUI(veh, 1)
                vehData.wheel3 = getVehWheelStatus2NUI(veh, 4)
                vehData.wheel4 = getVehWheelStatus2NUI(veh, 5)
                vehData.isBelt = seatbeltOn
                vehData.isLocked = GetVehicleDoorLockStatus(veh)
                vehData.steering = GetVehicleSteeringAngle(veh)
                
                SendNUIMessage({
                    action = "update",
                    data = vehData
                })
            else
                SendNUIMessage({ action = "close" })
                isInVehicle = false
            end

            Wait(150)
        end
    end)
end

----------------------------------
--         SEND DATA2UI         --
----------------------------------
getVehType2NUI = function(class)
    if (class == 8) then
        return 1
    elseif (class == 13) then
        return 4
    elseif (class == 15 or class == 16) then
        return 2
    elseif (class == 14) then
        return 3
    else 
        return 0
    end
end
getVehWheelStatus2NUI = function(veh, wheel)
    if IsVehicleTyreBurst(veh, wheel, true) then
        return 2
    elseif IsVehicleTyreBurst(veh, wheel, false) then
        return 1
    else
        return 0
    end
end

----------------------------------
--          BELT SYSTEM         --
----------------------------------
startLoopSeatbelt = function()
    seatbeltOn = false
    SetFlyThroughWindscreenParams(Config["Belt"]["ejectVelocity"], Config["Belt"]["ejectVelocity"] + 10.0, 17.0, Config["Belt"]["minDamage"])

    Citizen.CreateThread(function()
        while isInVehicle do
            Citizen.Wait(10)
            if IsPedInAnyVehicle(PlayerPedId()) then
                if seatbeltOn then
                    DisableControlAction(0, 75, true)
                    DisableControlAction(27, 75, true)
                end
            end
        end
    end)
end

toggleSeatbelt = function()
    seatbeltOn = not seatbeltOn
    if not seatbeltOn then
        SetFlyThroughWindscreenParams(Config["Belt"]["ejectVelocity"], Config["Belt"]["ejectVelocity"] + 10.0, 17.0, Config["Belt"]["minDamage"])
        SendNUIMessage({ action="playSound", sound="unbuckle.ogg", volume=0.4 })
    else
        SetFlyThroughWindscreenParams(10000.0, 10000.0, 17.0, 0.0);
        SendNUIMessage({ action="playSound", sound="buckle.ogg", volume=0.4 })
    end
end

RegisterKeyMapping("toggleseatbelt", "Toggle Seatbelt", "keyboard", Config["Belt"]["Key"])
RegisterCommand("toggleseatbelt", function()
    if IsPedInAnyVehicle(PlayerPedId(), false) then
        local class = GetVehicleClass(GetVehiclePedIsIn(PlayerPedId()))
        if class ~= 8 and class ~= 13 and class ~= 14 then
            toggleSeatbelt()
        end
    end
end)