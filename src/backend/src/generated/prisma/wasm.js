
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.22.0
 * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
 */
Prisma.prismaVersion = {
  client: "5.22.0",
  engine: "605197351a3c8bdd595af2d2a9bc3025bca48ea2"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  passwordHash: 'passwordHash',
  avatarUrl: 'avatarUrl',
  language: 'language',
  theme: 'theme',
  bio: 'bio',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.IngredientCatalogScalarFieldEnum = {
  ingredientKey: 'ingredientKey',
  displayName: 'displayName',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserAllergyScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  ingredientKey: 'ingredientKey',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.JwtTokenScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  token: 'token',
  exp: 'exp',
  userAgent: 'userAgent',
  ipAddress: 'ipAddress',
  revoked: 'revoked',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.FollowScalarFieldEnum = {
  id: 'id',
  followerId: 'followerId',
  followeeId: 'followeeId',
  createdAt: 'createdAt'
};

exports.Prisma.PostScalarFieldEnum = {
  id: 'id',
  authorId: 'authorId',
  title: 'title',
  shortDescription: 'shortDescription',
  ratingAvg: 'ratingAvg',
  ratingCount: 'ratingCount',
  cuisine: 'cuisine',
  countryCode: 'countryCode',
  imageUrl: 'imageUrl',
  isDeleted: 'isDeleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  totalTime: 'totalTime',
  difficulty: 'difficulty',
  totalSteps: 'totalSteps',
  currentVersion: 'currentVersion',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RecipeVersionMapScalarFieldEnum = {
  id: 'id',
  recipeId: 'recipeId',
  mongoVersion: 'mongoVersion',
  createdAt: 'createdAt',
  syncedAt: 'syncedAt'
};

exports.Prisma.IngredientScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  ingredientKey: 'ingredientKey',
  quantity: 'quantity',
  unit: 'unit',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RatingScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  userId: 'userId',
  value: 'value',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.CommentScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  userId: 'userId',
  content: 'content',
  isDeleted: 'isDeleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.BadgeScalarFieldEnum = {
  id: 'id',
  title: 'title',
  description: 'description',
  criteria: 'criteria',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserBadgeScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  badgeId: 'badgeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.RepostScalarFieldEnum = {
  id: 'id',
  originalPostId: 'originalPostId',
  sharerId: 'sharerId',
  description: 'description',
  isDeleted: 'isDeleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotebookScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  postId: 'postId',
  isDeleted: 'isDeleted',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.TagScalarFieldEnum = {
  id: 'id',
  name: 'name',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.PostTagScalarFieldEnum = {
  id: 'id',
  postId: 'postId',
  tagId: 'tagId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.MealPlanMetaScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  goal: 'goal',
  weekStart: 'weekStart',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NotificationScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  type: 'type',
  isRead: 'isRead',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.NoteScalarFieldEnum = {
  id: 'id',
  userId: 'userId',
  postId: 'postId',
  stepOrder: 'stepOrder',
  content: 'content',
  color: 'color',
  startIndex: 'startIndex',
  endIndex: 'endIndex',
  version: 'version',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullableJsonNullValueInput = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull
};

exports.Prisma.JsonNullValueInput = {
  JsonNull: Prisma.JsonNull
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.JsonNullValueFilter = {
  DbNull: Prisma.DbNull,
  JsonNull: Prisma.JsonNull,
  AnyNull: Prisma.AnyNull
};
exports.NotificationType = exports.$Enums.NotificationType = {
  follow: 'follow',
  comment: 'comment',
  rating: 'rating',
  badge: 'badge',
  repost: 'repost',
  system: 'system'
};

exports.Prisma.ModelName = {
  User: 'User',
  IngredientCatalog: 'IngredientCatalog',
  UserAllergy: 'UserAllergy',
  JwtToken: 'JwtToken',
  Follow: 'Follow',
  Post: 'Post',
  Recipe: 'Recipe',
  RecipeVersionMap: 'RecipeVersionMap',
  Ingredient: 'Ingredient',
  Rating: 'Rating',
  Comment: 'Comment',
  Badge: 'Badge',
  UserBadge: 'UserBadge',
  Repost: 'Repost',
  Notebook: 'Notebook',
  Tag: 'Tag',
  PostTag: 'PostTag',
  MealPlanMeta: 'MealPlanMeta',
  Notification: 'Notification',
  Note: 'Note'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
