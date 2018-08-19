export function chooseOption(options) {
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
}