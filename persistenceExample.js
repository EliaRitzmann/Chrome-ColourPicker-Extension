const persistenceWrapper = require("./persistence/persistenceWrapper")

async function example() {
    await persistenceWrapper.saveColor("youtube.ch", "#ffffff");
    const savedColor = await persistenceWrapper.getColor("youtube.ch");
    console.log(savedColor)
}

example()