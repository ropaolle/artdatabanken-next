// Prettify
type MainType = { name: string; age: number };
type NestedType = MainType & { isDev: boolean };
type Prettify<T> = { [K in keyof T]: T[K] } & {};
type PrettifiedType = Prettify<NestedType>;

// Exclude
type Shapes = { type: "circle"; radius: number } | { type: "square"; side: number };

type ExcludeType = Exclude<Shapes, { type: "circle" }>;

// Parsal and required
type Test = { id: number; name: string };
type PartialType = Partial<Test>;
type RequiredType = Required<Test>;

// Extract type from object
type Obj = {
  role: string;
  name: string;
  age: number;
};

type ValuesOf<T> = T[keyof T];

type ExtractStringKeys<TObj, TCondition> = ValuesOf<{
  [K in keyof TObj]: TObj[K] extends TCondition ? K : never;
}>;

type Example1 = ExtractStringKeys<Obj, string>; // "role" | "name"
type Example2 = ExtractStringKeys<Obj, number>; // "age"

// Extract array members
const roles = ["user", "admin", "superuser"] as const;

type RolesArray = typeof roles;

type Roles = RolesArray[number]; //"user" | "admin" | "superuser"

// Alternatives to Enum https://www.youtube.com/watch?v=jjMbPt_H3RQ&t=305s

const LOG_LEVEL = {
  DEBUG: "DEBUG",
  WARNING: "WARNING",
  ERROR: "ERROR",
};
type ObjectValues<T> = T[keyof T];
type LogLevel = ObjectValues<typeof LOG_LEVEL>;

const PATHS = {
  IMAGES: "images",
} as const;
type Paths = keyof typeof PATHS;

const fn = (paths: Paths, logLevel: LogLevel) => {
  console.info(paths, logLevel);
};
fn("IMAGES", LOG_LEVEL.DEBUG);

/**
 * Keys from object as const
 */
const routes = {
  home: "/",
  admin: "/admin",
  user: "/user",
} as const;

type RouteKeys = keyof typeof routes;

type Route = (typeof routes)[RouteKeys];

const goToRoute = (route: Route) => {};

goToRoute(routes.admin);
