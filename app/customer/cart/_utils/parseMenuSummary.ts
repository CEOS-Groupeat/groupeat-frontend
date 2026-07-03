export function parseMenuSummary(menuSummary: string) {
    const menuTitle = menuSummary.split('(')[0].trim();
    const optionText = menuSummary.match(/\((.+)\)/)?.[1] ?? '';
    const options = optionText ? optionText.split(',').map((opt) => opt.trim()) : [];

    return { menuTitle, options };
}