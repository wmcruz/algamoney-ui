export const environment = {
  production: true,
  apiUrl: 'https://algamoney-api-well.herokuapp.com',

  tokenWhitelistedDomains: [ /algamoney-api-well.herokuapp.com/ ],
  tokenBlackliestedRoutes: [/\/oauth\/token/]
};