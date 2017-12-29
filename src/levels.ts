import { Dictionary } from "lodash";

function creepParts({ work = 1, move = 1, carry = 0 }): BodyPartConstant[] {
    let parts = []
    for (let i = 0; i < work; i++) {
        parts.push(WORK);
    }


    for (let i = 0; i < move; i++) {
        parts.push(MOVE);
    }


    for (let i = 0; i < carry; i++) {
        parts.push(CARRY);
    }

    return parts as BodyPartConstant[]
}

export const settings: Setting[]  = [
    {
        creeps: {
            harvester: creepParts({ work: 1, move: 2, carry: 2 }),
            upgrader: creepParts({ work: 1, move: 1, carry: 3 })
        },
        buildings: {},
        next: function (room: Room): boolean {
            if (room.controller) {
                return room.controller.level >= 2
            }
            else {
                return false
            }
        }
    },
    {
        creeps: {
            harvester: creepParts({ work: 1, move: 1, carry: 3 }),
            upgrader: creepParts({ work: 1, move: 1, carry: 3 })
        },
        buildings: {},
        next: function (room: Room): boolean {
            let sources = room.find(FIND_SOURCES).length
            let containers = _.filter(room.find(FIND_STRUCTURES),
                function (s: Structure) { s.structureType == STRUCTURE_CONTAINER }).length
            let extensions = _.filter(room.find(FIND_STRUCTURES),
                function (s: Structure) { s.structureType == STRUCTURE_EXTENSION }).length

            return (containers == sources) && extensions == 5
        },
    }
]

