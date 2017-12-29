
export function roleUpgrader(creep: CreepUpgrader, spawn: StructureSpawn, allowCollect: boolean) {

    if(creep.memory.upgrading && creep.carry.energy == 0) {
        creep.memory.upgrading = false;
        creep.say('🔄 collect');
    }
    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
        creep.memory.upgrading = true;
        creep.say('⚡ upgrade');
    }

    if(creep.memory.upgrading) {
        const controller = creep.room.controller as StructureController;
        if(creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
            creep.moveTo(controller, {visualizePathStyle: {stroke: '#ffffff'}});
        }
    }
    else {
        if (allowCollect && creep.withdraw(spawn, RESOURCE_ENERGY )  == ERR_NOT_IN_RANGE) {
            creep.moveTo(spawn, {visualizePathStyle: {stroke: '#ffaa00'}});
        }
    }
}
