import L from "leaflet";
import yellowMarker from "./yellowMarker.svg";
import shadowMarker from "./shadowMarker.svg";

const yellowIcon = new L.Icon({
  iconUrl: yellowMarker,
  iconRetinaUrl: yellowMarker,

  iconAnchor: [15, 30],
  popupAnchor: [0, 0],
  shadowUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw1AUhU9TS4tUHOwg4pChOlkQFXHUKhShQqgVWnUweekfNGlIUlwcBdeCgz+LVQcXZ10dXAVB8AfEzc1J0UVKvC8ptIjxwuN9nHfP4b37AKFZZZrVMw5oum1mUkkxl18Vw6+IQEAIAURlZhlzkpSGb33dUx/VXYJn+ff9WX1qwWJAQCSeZYZpE28QT2/aBud94hgryyrxOfGYSRckfuS64vEb55LLAs+MmdnMPHGMWCx1sdLFrGxqxFPEcVXTKV/Ieaxy3uKsVeusfU/+wmhBX1nmOq1hpLCIJUgQoaCOCqqwkaBdJ8VChs6TPv4h1y+RSyFXBYwcC6hBg+z6wf/g92yt4uSElxRNAqEXx/kYAcK7QKvhON/HjtM6AYLPwJXe8deawMwn6Y2OFj8C+reBi+uOpuwBlzvA4JMhm7IrBWkJxSLwfkbflAcGboHeNW9u7XOcPgBZmlX6Bjg4BEZLlL3u8+5I99z+7WnP7weypXJauE7oGwAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+UIAgUEDHs16B8AAALJSURBVHja7Ztbb9pAEEYPu8EihItQAo1aqf//f1VpIAVRJ8VEXPvgcesCNr5g4t3tkXhAYMN83p2d2ZltUD0ecAe0gZa8bwIaUPKdHbAF1sAKeAcCYCHvK6NR0X27QB/oAbcl77UEXgEfeKuzAE3gHhjI066CAJgDMxkttRDAA4bAA3DDddgAU+BH2SlSVoAR8ElE+AhWwAR4ubYAHeBR5nkd8IEx8CvvhbrAjw2BrxXO8yK05GHsxE9UIoAGvshLUz+0iKBl+dxfUgBPDB9RfzrijJcSW5QWwAM+i5c3hbaIEJwTQWcc9iYZHxdBi2PcFxXAlGGfJkJDIsncAgxFANPpSOAU5BGgI0udxg7aSYmVSrjgUWJ7W2iKTZlGwMjweZ8WLG1lJCSOAE9ie1s5ylvUCcfnWSxAlLmeFKBp6Hqfl4e4f4sLcH/FfP4juRFbjwQY4A6DQwG6NUtvrxEXdOMC9HGPflyAnoMC9CIBPMpvXZvILeApwqKFq9wpx5zfkTNUEiO7SktZHvqeDY2VZWlv7jRZYc+mRxG0InlTxAWUy8b/yQV2Dtu/U2SonljMVnGhRgNDWSsq7sGpOStF2JDkKu+KnPV0ywgUB/vkjrGIfMDSQeOXkQ+AlOqpxbwSC4N9BwXw4wK8OeYMA7H5n0Ro7pAA83guEDEjbCSwnY3YeiTAmrD91Ham8fD/MB0u3Xtb99BXbCRJgKj31lYmhw/41IbIi6XLos+JpuqkHaGxZWnyWmw6QqfMlR32FE2fgJ95BIiCBU3YMmf6vB8nfXhuS3xB2FFhavlsCnynRKvsXrImE0WYAc/ngrssRZFtbDq0DXryz1limqxVoS1h13XDAJ8wkWGfKazPUxbbSw694W8ret2WuidxePusFxUxIjrR2aQ+pXUf+Ja01KXx/9jcBf6E0wcn4zh7dPYUTh6eTpsitT0+/xsHVpyBCkqTPwAAAABJRU5ErkJggg==",
  shadowSize: [24,12],
  shadowAnchor: [12,6],
  iconSize: [30, 30],
  className: "yellowIcon",
});

export { yellowIcon };
