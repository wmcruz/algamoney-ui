export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-well.herokuapp.com',

  tokenWhitelistedDomains: [ new RegExp('algamoney-api-well.herokuapp.com') ],
  tokenBlackliestedRoutes: [ new RegExp('/\/oauth\/token/') ]
};