export default async (variable) => {
    if (typeof variable == "function") return await variable(Array.from(arguments).shift());
    return variable;
}