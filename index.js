const id = "CHANGE_ME" //change this to you server id - Remplacez ça par l'id du serveur.
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
        levels = levels.concat(response.data.users)
        page++
        response = await axios.get(url + "?page=" + page)
    }
    return levels
}

getLevels().then(levels => {
    levels.forEach(level => {
        if(level.level < 1) return //Don't include users when their level is < 1. Change this at your convenience
        //Here is the database logic, change this at your convenience
        console.log(level.username + " " + level.level + " " + level.currentLevelXp)
        db.set(level.id+"_"+id, {xp: level.currentLevelXp, level: level.level})
    })
})
