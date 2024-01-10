export function getYear(): number {
    return new Date().getFullYear();
}

export const getColorRepresentation = (colorName: string | undefined): string => {
    const colorMap: { [key: string]: string | string[] } = {
        "auburn": "#a52a2a",
        "auburn, white": ["#bd5353", "#FFFFFF"],
        "auburn, grey": ["#8E5252", "#808080"], 
        "blond": "#FAF0BE",
        "blonde": "#FAF0BE",
        "black": "#000000",
        "tan": "#D2B48C",
        "brown mottle": "#a52a2a",
        "blue, grey": ["#0000FF", "#808080"],
        "blue": "#0000FF",
        "gold": "#FFD700",
        "grey": "#808080",
        "green": "#00ff00",
        "grey, red": ["#808080", "#ff0000"],
        "grey, blue": ["#808080", "#0000FF"],
        "grey, green, yellow": ["#808080", "#00ff00", "#FFFF00"],
        "fair, green, yellow": ["#FFDAB9", "#00ff00", "#FFFF00"],
        "silver, red": ["#c0c0c0", "#ff0000"],
        "green-tan, brown": "#7d753d",
        "green, grey": ["#00ff00", "#808080"],
        "red, blue, white": ["#ff0000", "#0000FF", "#FFFFFF"],
        "brown, white": ["#A52A2A", "#FFFFFF"],
        "white, blue": ["#FFFFFF", "#ADD8E6"],
        "white, red": ["#FFFFFF", "#ff0000"],
        "white": "#FFFFFF",
        "brown, grey": "#86775F",
        "brown": "#A52A2A",
        "light": "#EBCCA3",
        "fair": "#FFDAB9",
        "red": "#ff0000",
        "pale": "#db7093",
        "yellow": "#FFFF00",
        "metal": "#aaa9ad",
        "mottled green": "#008000",
        "dark": "#242526",
        "orange": "#FFA500",
        "none": "none",
        "unknown": "unknown",
        "n/a": "n/a",
    };

    if (colorName) {
        const colorValue = colorMap[colorName];
        if (Array.isArray(colorValue)) {
            // Create a linear gradient for multiple colors
            const gradient = colorValue.map((color, index, array) => {
                const width = 100 / array.length;
                return `${color} ${width * index}%, ${color} ${width * (index + 1)}%`;
            }).join(', ');
            return `linear-gradient(to right, ${gradient})`;
        } else {
            return colorValue; // Single color
        }
    } else {
        return "#FFFFFF"; // Default color
    }
};