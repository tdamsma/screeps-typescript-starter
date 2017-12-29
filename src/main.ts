import { ErrorMapper } from './utils/ErrorMapper';
import { settings } from './levels';
import { roleHarvester } from './role.harvester';

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code

Memory.level = 0
console.log('Initializing script')
export const loop = ErrorMapper.wrapLoop(() => {
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  const spawn = Game.spawns['Spawn1']
  const room = spawn.room

  var level = Memory.level as number
  console.log(`Current game tick is ${Game.time} @ level ${level}`);

  while (settings[level].next(room)) {
    level++
    Memory.level = level
  }
  const setting = settings[level] as Setting
  const creeps = Object.keys(Game.creeps).map(function (name) { return Game.creeps[name] })

  getHarvestSpots(spawn, room);

  const harvesters = _.filter(creeps, { memory: { role: 'harvester' } }) as CreepHarvester[]
  const upgraders = _.filter(creeps, { memory: { role: 'upgrader' } }) as CreepUpgrader[]
  const builders = _.filter(creeps, { memory: { role: 'builders' } }) as CreepBuilder[]

  addHarvesters(setting, harvesters, spawn);


  for (let creep of harvesters) {
    roleHarvester(creep, spawn)
  }

  // let allowCollect = harvesters.length == Memory.harvestSpots.length
  // for (let creep of upgraders) {
  //   roleUpgrader(creep, spawn, allowCollect)
  // }
  // if (allowCollect && upgraders.length <= 2) {
  //   spawn.spawnCreep([MOVE, CARRY, CARRY, CARRY, WORK],
  //     `upgrader ${Game.time}`,
  //     { memory: { role: 'upgrader', upgradeing: false } });
  // }


});

function addHarvesters(setting: Setting, harvesters: CreepHarvester[], spawn: StructureSpawn) {
  const harvestSpots = Memory.harvestSpots
  if (harvesters.length < harvestSpots.length) {
    const occupied: RoomPosition[] = harvesters.map(function (creep: CreepHarvester) {
      return new RoomPosition(creep.memory.harvestSpot.pos.x, creep.memory.harvestSpot.pos.y, creep.memory.harvestSpot.pos.roomName);
    });
    // console.log('occupied', occupied);
    let spot: HarvestSpot = harvestSpots.find(function (s: HarvestSpot) {
      let pos = new RoomPosition(s.pos.x, s.pos.y, s.pos.roomName);
      // console.log('position', pos);
      let match = occupied.find(function (o: RoomPosition) {
        // console.log(o, pos, o.isEqualTo(pos));
        return o.isEqualTo(pos);
      });
      // console.log('match', pos, match, match === undefined);
      return match === undefined;
    });
    if (!spot) {
      console.log('ERROR finding spot');
    }
    else {
      setting.creeps.harvester ? spawn.spawnCreep(setting.creeps.harvester, `harvester ${Game.time}`,
        { memory: { role: 'harvester', harvestSpot: spot } }) : console.log('ERROR adding creep');
    }
  }
}

function getHarvestSpots(spawn: StructureSpawn, room: Room) {
  if (Memory.harvestSpots === undefined) {
    const sources = spawn.room.find(FIND_SOURCES);
    let harvestSpots: HarvestSpot[] = [];
    for (let source of sources) {
      let sourceId = source.id;
      let { x, y } = source.pos;
      for (let i = x - 1; i <= x + 1; i++) {
        for (let j = y - 1; j <= y + 1; j++) {
          if (!PathFinder.search(spawn.pos, new RoomPosition(i, j, room.name)).incomplete) {
            console.log('found spot', i, j)
            harvestSpots.push({
              pos: { x: i, y: j, roomName: room.name },
              sourceId: sourceId,
            })
          }
        }
      }
    }
    console.log(harvestSpots);

    Memory['harvestSpots'] = harvestSpots;
  }
}


  // else if (Memory.scouting.scouted === false) {
  //   spawn.spawnCreep(
  //     [MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
  //     'scout',
  //     { memory: { role: 'scout' } })
  //   let scout = Game.creeps['scout']
  //   console.log('scout', scout)
  //   let target = Memory.scouting.targets.find(function (t: any) { return t.reachable === null; })
  //   console.log(target.pos.x, target.pos.y)
  //   if (target) {
  //     let pos =
  //     console.log('scout', scout)
  //     if (pos.isEqualTo(scout.pos.x, scout.pos.y)) {
  //       target.reachable = true
  //       console.log('reached')
  //     } else {



  //       let path = scout.pos.findPathTo(pos)
  //       if (!path[0]) {
  //         target.reachable = false
  //       }
  //       console.log('path', path[0])
  //       console.log('path',path[0].direction)
  //       console.log(scout.move(path[0].direction))

  //     }
  //   }
  // }


  // console.log(Memory.scout)
  // console.log(spawn.room.find(FIND_SOURCES))

  // for (let o of spawn.room.lookAt(30, 21)){
  //   console.log(o.terrain)
  // }
  // console.log()


  // roleHarvester(Game.creeps['c1'])
  // console.log(Game.creeps['c2']);
  // var tower = Game.getObjectById('7ea8e4964529f87557944111');
  // if (tower) {
  //   var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
  //     filter: (structure) => structure.hits < structure.hitsMax
  //   });
  //   if (closestDamagedStructure) {
  //     tower.repair(closestDamagedStructure);
  //

  //   var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
  //   if (closestHostile) {
  //     tower.attack(closestHostile);
  //   }
  // }

  // let i = 0
  // for (var name in Game.creeps) {
  //   var creep = Game.creeps[name];
  //   if (i < 3) {
  //     roleHarvester(creep);
  //   } else if (i < 2) {
  //     roleUpgrader(creep);
  //   } else if (i < 60) {
  //     roleBuilder(creep);
  //   }
  //   i++
  // }

  // if (Game.spawns['Spawn1'].energy == Game.spawns['Spawn1'].energyCapacity) {

  // Game.spawns['Spawn1'].spawnCreep([WORK, WORK, CARRY, MOVE], 'c'+${Game.time}, {memory: {role:'builder'}})
  // }
