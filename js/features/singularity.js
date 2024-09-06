const S_MILESTONES = [
    {
        unl:()=>true,
        req:()=>player.singularity.best_bh.gte(1),
    },{
        unl:()=>true,
        req:()=>player.singularity.best_bh.gte(2),
    },{
        unl:()=>true,
        req:()=>player.singularity.best_bh.gte(3),
    },{
        unl:()=>true,
        req:()=>player.singularity.best_bh.gte(4),
    },{
        unl:()=>true,
        req:()=>player.singularity.best_bh.gte(5),
    },{
        unl:()=>true,
        req:()=>player.singularity.best_bh.gte(6),
    },{
        unl:()=>true,
        req:()=>player.singularity.best_bh.gte(7),
    },{
        unl:()=>true,
        req:()=>player.singularity.bh.gte(8),
    },

    {
        unl:()=>player.feature>=18,
        req:()=>CURRENCIES["dark-matter"].total.gte(1),
    },{
        unl:()=>player.feature>=18,
        req:()=>CURRENCIES["dark-matter"].total.gte(10),
    },{
        unl:()=>player.feature>=18,
        req:()=>CURRENCIES["dark-matter"].total.gte(1e6),
    },{
        unl:()=>player.feature>=20,
        req:()=>CURRENCIES["dark-matter"].total.gte(1e12),
    },
]

const REMNANT_UPGS = [
    {
        unl:()=>true,
        cost:a=>a.add(1).pow(1.25).pow_base(10),
        bulk:a=>a.log(10).root(1.25).floor(),
        effect(a) {
            let x = a.mul(.5).add(1)
            return x
        },
        effDesc: x=>"+"+formatPercent(x.sub(1)),
    },{
        unl:()=>true,
        cost:a=>a.add(1).pow(1.25).pow_base(2).mul(5e2),
        bulk:a=>a.div(5e2).log(2).root(1.25).floor(),
        effect(a) {
            let x = a.pow_base(10)
            return x
        },
        effDesc: x=>formatMult(x),
    },{
        unl:()=>true,
        cost:a=>a.add(1).pow(1.25).pow_base(10).mul(1e3),
        bulk:a=>a.div(1e3).log(10).root(1.25).floor(),
        effect(a) {
            let x = a.root(2).mul(1).add(1)
            return x
        },
        effDesc: x=>"+"+formatPercent(x.sub(1)),
    },{
        unl:()=>true,
        cost:a=>a.add(1).pow(1.25).pow_base(5).mul(2e7),
        bulk:a=>a.div(2e7).log(5).root(1.25).floor(),
        effect(a) {
            let x = a.pow_base(2)
            return x
        },
        effDesc: x=>formatMult(x),
    },
    
    {
        unl:()=>player.singularity.best_bh.gte(2),
        cost:a=>a.add(1).pow(1.25).pow_base(100),
        bulk:a=>a.log(100).root(1.25).floor(),
        effect(a) {
            if (hasResearch('dm2')) a = a.sqr();
            let x = player.fish.add(1).log10().add(1).log10().add(1).pow(a)
            return x
        },
        effDesc: x=>formatPow(x),
    },{
        unl:()=>player.singularity.best_bh.gte(2),
        cost:a=>a.add(1).pow(1.25).pow_base(10).mul(1e5),
        bulk:a=>a.div(1e5).log(10).root(1.25).floor(),
        effect(a) {
            let x = a.mul(.5).add(1)
            return x
        },
        effDesc: x=>"+"+formatPercent(x.sub(1)),
    },{
        unl:()=>player.singularity.best_bh.gte(4),
        cost:a=>a.add(1).pow(1.25).pow_base(100).mul(1e4),
        bulk:a=>a.div(1e4).log(100).root(1.25).floor(),
        effect(a) {
            let x = a.pow_base(2)
            return x
        },
        effDesc: x=>formatMult(x),
    },{
        unl:()=>player.singularity.best_bh.gte(5),
        cost:a=>a.add(1).pow(1.25).pow_base(5).mul(20),
        bulk:a=>a.div(20).log(5).root(1.25).floor(),
        effect(a) {
            if (hasResearch('dm3')) a = a.pow(3.5);
            let x = a.pow_base(10)
            return x
        },
        effDesc: x=>formatMult(x),
    },

    {
        unl:()=>player.feature>=19,
        cost:a=>a.add(1).pow(1.25).pow_base(1e5).mul(1e55),
        bulk:a=>a.div(1e55).log(1e5).root(1.25).floor(),
        effect(a) {
            let x = a.add(1).pow(2)
            return x
        },
        effDesc: x=>formatPow(x,0),
    },{
        unl:()=>player.feature>=19,
        cost:a=>a.add(1).sumBase(1.1).pow_base(1e5).mul(1e65),
        bulk:a=>a.div(1e65).log(1e5).sumBase(1.1,true).floor(),
        effect(a) {
            let x = a.pow_base(2)
            return x
        },
        effDesc: x=>formatMult(x,0),
    },{
        unl:()=>player.feature>=19,
        cost:a=>a.add(1).pow(1.25).pow_base(1e5).mul(1e95),
        bulk:a=>a.div(1e95).log(1e5).root(1.25).floor(),
        effect(a) {
            let x = a.add(1).pow(2)
            return x
        },
        effDesc: x=>formatMult(x,0),
    },
    {
        unl:()=>hasElement(1),
        cost:a=>a.pow(2).pow10(),
        bulk:a=>a.log10().root(2),
        effect(a) {
            let x = a.add(1).pow(2)
            return x
        },
        effDesc: x=>formatMult(x,0),
    },
]

function buyRemnantUpg(i) {
    let u = REMNANT_UPGS[i], lvl, cost, amt = player.singularity.remnants
    if (u.unl() && amt.gte(cost = u.cost(lvl = player.singularity.upgs[i]))) {
        let bulk = lvl.add(1).max(u.bulk(amt))
        player.singularity.upgs[i] = bulk
        if (!hasSMilestone(10)) player.singularity.remnants = amt.sub(u.cost(bulk.sub(1))).max(0)
    }
}

function hasSMilestone(i) { return S_MILESTONES[i].req() }
function remnantUpgEffect(i,def=1) { return tmp.remnant_upg_effects[i]??def }

function updateSingularityTemp() {
    tmp.bh_reduction = player.singularity.bh.gte(8) ? E(1) : Decimal.div(1,player.singularity.bh.sub(player.research.dm1).max(0).pow(2).div(20).add(1))

    for (let i = 0; i < REMNANT_UPGS.length; i++) {
        let u = REMNANT_UPGS[i]
        if ('effect' in u) tmp.remnant_upg_effects[i] = u.effect(player.singularity.upgs[i])
    }
}

function updateBlackHoleHTML() {
    let remnants = player.singularity.remnants, texts = [lang_text('remnant-upgrades')]

    el('black-hole-amount').innerHTML = format(player.singularity.bh,0) + " / 8"
    el('black-hole-effect').innerHTML = formatPow(tmp.bh_reduction,4)

    el('remnant-amount').innerHTML = format(remnants,0)
    el('remnant-gain').innerHTML = formatGain(remnants,tmp.currency_gain.remnants)

    for (let i = 0; i < REMNANT_UPGS.length; i++) {
        let u = REMNANT_UPGS[i], id = `remnant-upg-${i}-`, e = el(id+'button'), unl = u.unl()

        e.style.display = el_display(unl)

        if (unl) {
            let lvl = player.singularity.upgs[i]

            el(id+'level').textContent = format(lvl,0)
            el(id+'desc').innerHTML = texts[0][i][1](toColoredText(u.effDesc(tmp.remnant_upg_effects[i]),'lime'))

            let cost = u.cost(lvl)

            el(id+'cost').textContent = format(cost)
            e.className = el_classes({'remnant-upg': true, locked: remnants.lt(cost)})
        }
    }
}

function setupSingularityHTML() {
    let h = "", texts = [lang_text('remnant-upgrades'),lang_text('cost')]

    for (let i = 0; i < S_MILESTONES.length; i++) {
        let s = S_MILESTONES[i]

        h += `
        <div class="singularity-milestone" id="sm-${i}"><h3>???</h3><br>???</div>
        `
    }

    el('singularity-milestones').innerHTML = h

    h = ""

    for (let i = 0; i < REMNANT_UPGS.length; i++) {
        h += `<button class="remnant-upg" id="remnant-upg-${i}-button" onclick="buyRemnantUpg(${i})"><b>${texts[0][i][0]}</b> [<span id="remnant-upg-${i}-level">0</span>]<div id="remnant-upg-${i}-desc">${texts[0][i][1]('???')}</div>${texts[1]}: <span id="remnant-upg-${i}-cost">???</span></button>`
    }

    el('remnant-upgs').innerHTML = h
}

function updateSingularityMilestones() {
    let text = lang_text('singularity-milestones')

    for (let i = 0; i < S_MILESTONES.length; i++) {
        let s = S_MILESTONES[i], e = el(`sm-${i}`), unl = s.unl()

        e.style.display = el_display(unl)

        if (unl) {
            let t = text[i]

            e.innerHTML = `<h3>${t[0]}</h3><br>${t[1]}`
            e.style.borderColor = s.req() ? "lime" : "white"
        }
    }
}

//Elements
let ELEMENTS = [
    {
        name: "Hydrogen",
        abbr: "H",
        cost: E(100),
        effect_desc: `Boosts ${toTextStyle('Remnant', 'black-hole')} gain.`,
        get effect() {
            let x = E(1.25)

            if (hasElement(3)) x = x.mul(elemEffect(3))
                if (hasElement(11)) x = x.mul(elemEffect(11))

            return x
        }
    },
    {
        name: "Helium",
        abbr: "He",
        cost: E(500),
        effect_desc: `Unlocks a new ${toTextStyle('Remnant', 'black-hole')} upgrade, and also boosts ${toTextStyle('Dark Matter', 'black-hole')} and you can now passively gain it.`,
        get effect() {
            let x = E(1.25)

            if (hasElement(5)) x = x.mul(elemEffect(5))
                if (hasElement(17)) x = x.mul(elemEffect(17))

            return x
        }
    },
    {
        name: "Lithium",
        abbr: "Li",
        cost: E(1e4),
        effect_desc: `Quark gain is squared`,
        get effect() {
            let x = E(2)
            if (hasElement(6)) x = x.mul(elemEffect(6))
            if (hasElement(9)) x = x.mul(elemEffect(9))
            return x
        }
    },
    {
        name: "Beryllium",
        abbr: "Be",
        cost: E(2.5e6),
        effect_desc: `Boost Hydrogen-1's effect`,
        get effect() {
            let x = E(1.25)

            return x
        }
    },
    {
        name: "Boron",
        abbr: "B",
        cost: E(1e7),
        effect_desc: `${toTextStyle('Magmatic', 'core')} fragments are boosted`,
        get effect() {
            let x = E(1.05)
            if (hasElement(12)) x = x.add(elemEffect(12))
                if (hasElement(16)) x = x.add(elemEffect(16))

            return x
        }
    },
    {
        name: "Carbon",
        abbr: "C",
        cost: E(5e7),
        effect_desc: `Boost Helium-2's effect`,
        get effect() {
            let x = E(1.25)

            return x
        }
    },
    {
        name: "Nitrogen",
        abbr: "N",
        cost: E(1e8),
        effect_desc: `Boost Lithium-3's effect`,
        get effect() {
            let x = E(1.5)

            return x
        }
    },
    {
        name: "Oxygen",
        abbr: "O",
        cost: E(1e9),
        effect_desc: `Increase the exponent of ${toTextStyle('Prestige', 'prestige')} shards`,
        get effect() {
            let x = E(1.1)
            if (hasElement(10)) x = x.add(elemEffect(10))
                if (hasElement(19)) x = x.add(elemEffect(19))
            return x
        }
    },
    {
        name: "Fluorine",
        abbr: "F",
        cost: E(1e10),
        effect_desc: `Increase the exponent of ${toTextStyle('Fish', 'fish')}`,
        get effect() {
            let x = E(1.25)
            if (hasElement(13)) x = x.add(elemEffect(13))
                if (hasElement(14)) x = x.add(elemEffect(14))
            return x
        }
    },
    {
        name: "Neon",
        abbr: "Ne",
        cost: E(2.5e10),
        effect_desc: `Boosts Lithium-3 yet again.`,
        get effect() {
            let x = E(2.5)

            return x
        }
    },
    {
        name: "Sodium",
        abbr: "Na",
        cost: E(2.5e21),
        effect_desc: `Adds to Oxygen-8's effect`,
        get effect() {
            let x = E(0.1)

            return x
        }
    },
    {
        name: "Magnesium",
        abbr: "Mg",
        cost: E(5e21),
        effect_desc: `Boosts Hydrogen-1 again`,
        get effect() {
            let x = E(1.5)

            return x
        }
    },
    {
        name: "Aluminum",
        abbr: "Al",
        cost: E(1e23),
        effect_desc: `Adds on to Boron-5's effect`,
        get effect() {
            let x = E(0.15)

            return x
        }
    },
    {
        name: "Silicon",
        abbr: "Si",
        cost: E(1e24),
        effect_desc: `Adds on to Flourine-9's effect, and raises Quark gain by 1.25`,
        get effect() {
            let x = E(0.25)

            return x
        }
    },
    {
        name: "Phosphorus",
        abbr: "P",
        cost: E(2.5e29),
        effect_desc: `Adds on to Flourine-9's effect AGAIN`,
        get effect() {
            let x = E(0.25)

            return x
        }
    },
    {
        name: "Sulfur",
        abbr: "S",
        cost: E(5e29),
        effect_desc: `Raises Quark gain by 1.25 again`,
        get effect() {
            let x = E(0.25)

            return x
        }
    },
    {
        name: "Chlorine",
        abbr: "Cl",
        cost: E(1e36),
        effect_desc: `Adds to Boron-5's effect again`,
        get effect() {
            let x = E(0.25)

            return x
        }
    },
    {
        name: "Argon",
        abbr: "Ar",
        cost: E(2.5e39),
        effect_desc: `Boosts Helium-2's effect`,
        get effect() {
            let x = E(1.75)

            return x
        }
    },
    {
        name: "Potassium",
        abbr: "K",
        cost: E(1e41),
        effect_desc: `Raises Quark gain by 2`,
        get effect() {
            let x = E(2)

            return x
        }
    },
    {
        name: "Calcium",
        abbr: "Ca",
        cost: E(1e80),
        effect_desc: `Adds to Oxygen-8's effect again`,
        get effect() {
            let x = E(0.25)

            return x
        }
    },
    {
        name: "Scandium",
        abbr: "Sc",
        cost: E('e1.79e308'),
        effect_desc: `Coming Soon! Stay tuned for the next update!`,
    },
];
let current_element = -1
function updateElementsHTML() {
        el('quark-amount').innerHTML =  `You have <h2>${format(player.singularity.quarks)}</h2> ${formatGain(player.singularity.quarks,tmp.currency_gain.quarks)} quarks`
    for (i = 0; i < ELEMENTS.length; i++) {
        if (player.singularity.elements.includes(i)) {
            el(`elem${i + 1}`).classList.add("bought");
        } else {
        if (player.singularity.quarks.gte(ELEMENTS[i].cost)) {
            el(`elem${i + 1}`).classList.remove("locked");
        } else {
            el(`elem${i + 1}`).classList.add("locked");
        }
        el(`elem${i + 1}`).classList.remove("bought");
    }
       
    }

    if (current_element !== -1) {
        el('elem-name').innerHTML = ELEMENTS[current_element].name + `-${current_element + 1}`
        el('elem-cost').innerHTML  = format(ELEMENTS[current_element].cost) + " Quarks"
        el('elem-effect').innerHTML = ELEMENTS[current_element].effect_desc
    } else {
        el('elem-name').innerHTML = "Hover over an element to see it's description!"
        el('elem-cost').innerHTML  = ""
        el('elem-effect').innerHTML = ""
    }
}
function buyElement(i) {
    if (!player.singularity.elements.includes(i) && player.singularity.quarks.gte(ELEMENTS[i].cost)) {
        player.singularity.elements.push(i)
    }
}
const getCurrentElement = i => current_element = i;
const elemEffect = i => ELEMENTS[i].effect;
const hasElement = i => player.singularity.elements.includes(i);
function createElementsHTML() {
    for (let i = 0; i < ELEMENTS.length; i++) {
        const button = document.createElement('button');
        let e = i
        button.className = 'elemental';
        button.id = `elem${i+1}`;
        button.innerHTML = `${ELEMENTS[i].abbr}-${i+1}`;
        
        // Add event listeners for mouseover and mouseout
        button.addEventListener('mouseover', function() {
            getCurrentElement(e)
        });
        
        button.addEventListener('mouseout', function() {
            current_element = -1
        });

        button.addEventListener('click', () => buyElement(i));
        
        el(`element${Math.floor(i / 10) + 1}`).appendChild(button);
    }
}