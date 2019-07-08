import GenezisChecker from "../Checker";
import deleteOnProduction from "./deleteOnProduction";
import doPlugins from "./doPlugins";

const GenezisCheckConfig = deleteOnProduction({
    data: GenezisChecker.object(),
    plugins: GenezisChecker.array({ of: GenezisChecker.function() }).required(),
    doPluginsSettings: GenezisChecker.object(),
    onError: GenezisChecker.function().required()
});

export default async (data) => {
    GenezisChecker(data, GenezisCheckConfig);

    let doc = {};

    try {
        await doPlugins(
            data.plugins,
            {
                doc: doc,
                ...data.data
            },
            data.doPluginsSettings
        );
    } catch (error) {
        data.onError(error);
    }

    return doc;
};