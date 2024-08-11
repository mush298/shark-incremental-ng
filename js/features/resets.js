const RESETS = {
    prestige: {
        get require() { return player.total_fish.gte(1e36) }, 
        reset(force) {
            if (!force) {
                gainCurrency('prestige',tmp.currency_gain.prestige)
                player.prestige.times++
                increaseFeature(1)
            }

            this.doReset()
        },
        doReset() {
            player.fish = E(1)
            player.total_fish = E(0)
            player.shark_level = E(0)

            resetSharkUpgrades('s1','s2','s3','s4')
        },
    },
    core: {
        get require() { return player.prestige.total.gte('e450') }, 
        reset(force) {
            if (!force) {
                gainCurrency('core',tmp.currency_gain.core)
                player.core.times++
                increaseFeature(6)
            }

            player.core.assembler_strength = player.core.assembler_strength.map((_,i)=>tmp.ca_building_strength[i])

            this.doReset()
        },
        doReset() {
            player.prestige.total = E(0)
            player.prestige.shards = E(0)

            resetSharkUpgrades('p1','p2','p3')
            if (!hasResearch("c1")) resetResearch('p3','e1','e2')

            var k = player.research.c2.round().toNumber()

            player.explore.unl = k == 4 && player.feature>=8 ? 5 : k
            for (let x = 0; x < 4; x++) {
                player.explore.res[x] = E(0)
                if (x >= k) player.explore.depth[x] = E(0)
                player.explore.base[x] = E(0)
                player.explore.upg[x] = [E(0), E(0)]
            }
            player.explore.active = -1

            RESETS.prestige.doReset()
        },
    },
    humanoid: {
        get require() { return player.fish.gte(CURRENCIES.humanoid.require) }, 
        reset(force) {
            if (!force) {
                gainCurrency('humanoid',tmp.currency_gain.humanoid)
                player.humanoid.times++
                increaseFeature(11)
            }

            this.doReset()
        },
        doReset() {
            var c = player.core

            c.fragments = E(0)
            c.total = E(0)

            c.reactor = c.reactor.map(()=>E(0))

            c.radiation.active = false
            c.radiation.amount = E(0)
            c.radiation.gen = E(hasEvolutionGoal(6) ? 1 : 0)
            c.radiation.boost = E(0)

            if (!hasEvolutionGoal(1)) {
                c.max_buildings = 0
                c.assembler = c.assembler.map(()=>-1)
                c.assembler_strength = c.assembler_strength.map(()=>0)
            }

            resetSharkUpgrades('s5')
            if (!hasEvolutionGoal(4)) resetResearch('p8','e3','e4','e5','c3','c4','c5','c7','c8','c9')

            for (let x = 0; x < 5; x++) {
                player.explore.res[x] = E(0)
                player.explore.depth[x] = hasEvolutionGoal(3) ? E(EXPLORE[x].maxDepth) : E(0)
                player.explore.base[x] = E(0)
                player.explore.upg[x] = [E(0), E(0)]
            }

            player.shark_rank = E(0)

            tmp.pass = 1

            RESETS.core.doReset()
        },
    },
    black_hole: {
        get require() { return player.core.fragments.gte(CURRENCIES.black_hole.require) }, 
        reset(force) {
            if (!force) {
                gainCurrency('black_hole',tmp.currency_gain.black_hole)
                player.black_hole.times++
                increaseFeature(17)
            }

            this.doReset()
        },
        doReset() {
            let h = player.humanoid
            h.shark = E(1)
           
if (!hasResearch('b1')) {
    h.faith = [E(0), E(0), E(0)]
    h.tree = []
    h.mining_tier = E(0)
            
    player.shark_upg.m1 = E(0)
    player.shark_upg.m2 = E(0)
    player.shark_upg.m3 = E(0)
    player.shark_upg.m4 = E(0)
    player.shark_upg.m5 = E(0)

    h.ores.stone = E(0)
    h.ores.coal = E(0)
    h.ores.iron = E(0)
    h.ores.gold = E(0)
    h.ores.platinum = E(0)
    h.ores.bismuth = E(0)
    h.ores.diamond = E(0)
    h.ores.obsidian = E(0)
    h.ores.vibranium = E(0)
}
   
           

           
            
            
            if (!hasResearch('b2')) {
                h.goal = []
                player.black_hole.size = E(0)
                player.shark_upg.b1 = E(0)

           for (i in h.forge.level) {
            h.forge.level[i] = E(0)
           }

            h.particle_accel = {
                active: -1,
                percent: [E(0),E(0),E(0),E(0),E(0),E(0)],
            }
                RESETS.humanoid.doReset()
            }

        },
    },
}

function doReset(id, force, ...arg) {
    var r = RESETS[id]
    if (force || !player.radios['confirm-'+id] && r.require) r.reset(force, ...arg)
    else if (r.require) createConfirmationPopup(lang_text('reset-'+id+"-message"), () => {r.reset(false, ...arg)})
}