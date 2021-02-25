import routes from "../../routes";
import HeaderNav from "../HeaderNav/HeaderNav";
import { Switch, Route, Redirect } from "react-router-dom";

export function getBreadCrumbs(props) {
    const crumbs = routes
        // Get all routes that contain the current one.
        .filter(({ path }) => props.match.path.includes(path))
        // Swap out any dynamic routes with their param values.
        // E.g. "/pizza/:pizzaId" will become "/pizza/1"
        .map(({ path, ...rest }) => ({
            path: Object.keys(props.match.params).length
                ? Object.keys(props.match.params).reduce(
                      (path, param) =>
                          path.replace(`:${param}`, props.match.params[param]),
                      path
                  )
                : path,
            ...rest,
        }));

    return crumbs;
}

export const Routes = () => {
    return (
        <Switch>
            {routes.map(({ path, name, Component }, key) => (
                <Route
                    exact
                    path={path}
                    key={key}
                    render={(props) => {
                        let crumbs = getBreadCrumbs(props);
                        return (
                            <>
                                <HeaderNav crumbs={crumbs} />
                                <Component {...props} />
                            </>
                        );
                    }}
                />
            ))}
            <Redirect to={"/"} />
        </Switch>
    );
};
