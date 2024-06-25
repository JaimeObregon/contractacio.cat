# contractes

[![AGPL License](https://img.shields.io/badge/license-AGPL-blue.svg)](http://www.gnu.org/licenses/agpl-3.0)
<span class="badge-patreon"><a href="https://patreon.com/jaime_gomez_obregon" title="Apoya este proyecto en Patreon"><img src="https://img.shields.io/badge/patreon-donate-yellow.svg" alt="Botón para donar en Patreon" /></a></span>

Propuestas de mejora a la ergonomía de los portales de transparencia de la contratación pública en Cataluña.

Un trabajo de [Jaime Gómez-Obregón](https://x.com/JaimeObregon).

# Arquitectura

Es una aplicación estática (_frontend_) JavaScript, desarrollada íntegramente sobre estándares web, sin _frameworks_ ni librerías externas.

# Despliegue

Con cada _push_ a GitHub el proyecto se construye (`yarn build`) y despliega en [contractes.netlify.app](https://contractes.netlify.app) (Netlify).

# Desarrollo

Instala las dependencias con `yarn` o `npm install`.

Arranca el servidor de desarrollo con `yarn serve` o `npm run serve`. El repositorio incluye una tarea para Visual Studio Code.
