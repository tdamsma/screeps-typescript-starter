// type shim for nodejs' `require()` syntax
declare const require: (module: string) => any;

interface Creep {
    memory: {
        role: string,
        building?: boolean,
        fixing?: boolean,
        upgrading?: boolean,
        harvestSpotNr?: HarvestSpot
    }
}

interface CreepHarvester extends Creep {
    memory: {
        role: string,
        harvestSpot: HarvestSpot,
        upgrading: boolean,
        building: boolean
    }
}

interface CreepUpgrader extends Creep {
    memory: {
        role: string,
        upgrading: boolean
    }
}

interface CreepBuilder extends Creep {
    memory: {
        role: string,
        building: boolean
    }
}


interface Structure {
    energy: number,
    energyCapacity: number
}

interface HarvestSpot {
    pos: {
        x: number,
        y: number,
        roomName: string
    },
    sourceId: string
}

interface Next {
    (room: Room): boolean;
}

interface Setting {
    creeps: {
        harvester?: BodyPartConstant[],
        upgrader?: BodyPartConstant[],
        courier?: BodyPartConstant[]
    },
    buildings: {},
    next: Next
}

