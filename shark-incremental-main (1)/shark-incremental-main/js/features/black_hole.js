let bh_bonus = [
    {
        effect(x) {
        return x.log10().pow(3).add(1)
        }
    },
    {
        effect(x) {
        return x.log10().pow(2.5).add(1)
        }
    },
    {
        effect(x) {
        return x.add(1).log10().log10().add(1)
        }
    },
    {
        effect(x) {
        return x.add(1).log10().log10().add(1).pow(2).add(1)
        }
    },
    {
        effect(x) {
        return x.add(1).log10().log10().add(1).pow(4).add(1)
        }
    },
    {
        effect(x) {
            if (player.humanoid.forge.level['black_hole'] + 4 >= 5) {
        return x.log10().pow(3).add(1).log10().pow(1.5)
            } else {
                return E(1)
            }
        }
    },
]



function updateBHRHtml() {
    
    el('black_hole-size').innerHTML = lang_text('black_hole-size', format(player.black_hole.size))
    for (let i = 0; i < bh_bonus.length; i++) {
        if (player.humanoid.forge.level['black_hole'] + 4 >= i) {
            el(`black_hole-bonus${i}`).innerHTML = lang_text(`black_hole-bonus${i}`, format(bh_bonus[i].effect(player.black_hole.size)))
        } else {
            el(`black_hole-bonus${i}`).innerHTML = ""
        }
    
    }
    
}

const BHEffect = i => bh_bonus[i].effect(player.black_hole.size)

  

       
    
