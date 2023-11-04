const id = "1161296442577653802"
const url = "https://www.draftbot.fr/api/activities/levels/"+id

const axios = require("axios")
const { QuickDB } = require("quick.db");
const db = new QuickDB({filePath: `export_${id}.sqlite`});


async function getLevels() {
    let page = 0
    let levels = []
    let response = await axios.get(url + "?page=" + page)
    console.log(response.data.totalUsersCount)
    while (response.data.totalUsersCount > 0) {
        console.log("a")
        levels = levels.concat(response.data.users)
        page++
        response = await axios.get(url + "?page=" + page)
    }
    return levels
}

getLevels().then(levels => {
    console.log(levels.length)
    levels.forEach(level => {
        if(level.level < 1) return
        console.log(level.username + " " + level.level + " " + level.currentLevelXp)
        db.set(level.id+"_"+id, {xp: level.currentLevelXp, level: level.level})
    })
})