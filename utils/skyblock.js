// From BloomCore + TurtleAddons
const getMatchFromLines = (regex, list, type) => {
    for (let i = 0; i < list.length; i++) {
        let match = list[i].match(regex) 
        if (!match) continue 
        return type == "int" ? 
        parseInt(match[1]) : type == "float" ? parseFloat(match[1]) : match[1] 
    }
    return null 
}
const getScoreboard = (formatted=false) => {
    if (!World.getWorld()) return null 
    let sb = Scoreboard.getLines().map(a => a.getName()) 
    if (formatted) return Scoreboard.getLines() 
    return sb.map(a => ChatLib.removeFormatting(a)) 
}
const removeUnicode = (string) => typeof(string) !== "string" ? "" : string.replace(/[^\u0000-\u007F]/g, "") 
export function getArea() {
    return (removeUnicode(getMatchFromLines(/ ⏣ (.+)/, getScoreboard(false))))
};