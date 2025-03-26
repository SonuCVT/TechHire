import Keycloak from 'keycloak-js';
const keycloak = new Keycloak({
  url: 'http://localhost:8080',
  realm: 'TechHire',
  clientId: 'techhire-backend', // Keep your original client ID
  "public-client": true,
  "ssl-required": "none",
  enableLogging: true // For debugging
});
export default keycloak;