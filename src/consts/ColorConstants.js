export const Colors = {
    NAVY: "NAVY",
    BLUE: "BLUE",
    AQUA: "AQUA",
    TEAL: "TEAL",
    OLIVE: "OLIVE",
    GREEN: "GREEN",
    LIME: "LIME",
    YELLOW: "YELLOW",
    ORANGE: "ORANGE",
    RED: "RED",
    MAROON: "MAROON",
    FUCHSIA: "FUCHSIA",
    PURPLE: "PURPLE",
    BLACK: "BLACK",
    GRAY: "GRAY",
    SILVER: "SILVER",
    BLACK: "BLACK"
}

export function getNameOfColor(color = "#000000") {
    switch (color){
        case "NAVY": return "#001f3f";
        case "BLUE": return "#0074D9";
        case "AQUA": return "#7FDBFF";
        case "TEAL": return "#39CCCC";
        case "OLIVE": return "#3D9970";
        case "GREEN": return "#2ECC40";
        case "LIME": return "#01FF70";
        case "YELLOW": return "#FFDC00";
        case "ORANGE": return "#FF851B";
        case "RED": return "#FF4136";
        case "MAROON": return "#85144b";
        case "FUCHSIA": return "#F012BE";
        case "PURPLE": return "#B10DC9";
        case "BLACK": return "#111111";
        case "GRAY": return "#AAAAAA";
        case "SILVER": return "#DDDDDD";
        case "BLACK": return "#000000";
    }
}