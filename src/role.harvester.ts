export function roleHarvester(creep: CreepHarvester, spawn: StructureSpawn) {

    const controller = creep.room.controller as StructureController;
    if (creep.memory.building) {
        if (creep.carry.energy > 0) {
            let target = creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES);
            if (target) {
                if (creep.build(target) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {
                        visualizePathStyle: {
                            stroke: '#ffffff'
                        }
                    });
                }
            }
        } else {
            creep.memory.building = false
        }
    } else if (creep.memory.upgrading) {
        if (creep.carry.energy > 0) {
            if (creep.upgradeController(controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(controller, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }
        } else {
            creep.memory.upgrading = false
        }
    } else if (creep.carry.energy < creep.carryCapacity) {
        const source = Game.getObjectById(creep.memory.harvestSpot.sourceId) as Source

        const spot = new RoomPosition(
            creep.memory.harvestSpot.pos.x,
            creep.memory.harvestSpot.pos.y,
            creep.memory.harvestSpot.pos.roomName)
        if (creep.harvest(source) == ERR_NOT_IN_RANGE) {

            creep.moveTo(spot, {
                visualizePathStyle: {
                    stroke: '#ffaa00'
                }
            });
        }
    } else {
        let target1 = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return (structure.structureType == STRUCTURE_CONTAINER)
                    && structure.store ? structure.store.energy < structure.storeCapacity : false;
            }
        });

        let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
            filter: (structure: AnyStructure) => {
                return (
                    (structure.structureType == STRUCTURE_SPAWN) ||
                    (structure.structureType == STRUCTURE_CONTAINER)
                )
                    && structure.structureType == STRUCTURE_CONTAINER ? structure.store.energy < structure.storeCapacity :
                    structure.energy < structure.energyCapacity
                    ;
            }
        });



        // let target = creep.pos.findClosestByRange(FIND_STRUCTURES, {
        //     filter: (structure: StructureContainer) => {
        //         return (structure.structureType == STRUCTURE_CONTAINER) && structure.energy ? structure.energy < structure.energyCapacity :
        //             _.sum(structure.store) < structure.storeCapacity;
        //     }
        // });
        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == (ERR_NOT_IN_RANGE)) {
                creep.moveTo(target, {
                    visualizePathStyle: {
                        stroke: '#ffffff'
                    }
                });
            }

        } else if (creep.pos.findClosestByRange(FIND_CONSTRUCTION_SITES)) {
            creep.memory.building = true
        } else {
            creep.memory.upgrading = true
        }
    }
}
