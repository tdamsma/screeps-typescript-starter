export function roleBuilder(creep: Creep) {
    if (creep.memory.building && creep.carry.energy == 0) {
        creep.memory.building = false;
        creep.say('🔄 harvest');
    }
    if (!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
        creep.memory.building = true;
        creep.say('🚧 build');
    }

    if (creep.memory.building) {
        var target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
        if (target) {
            if (creep.build(target) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target, { visualizePathStyle: { stroke: '#ffffff' } });
            }
        }
    }
    else {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
        }
    }
}


