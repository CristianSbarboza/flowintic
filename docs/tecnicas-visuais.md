# Técnicas de Design Visual Premium

Este documento lista as técnicas avançadas de interface utilizadas em sites de alto padrão (como Antigravity, Stripe e Apple) para criar experiências imersivas e interativas.

## 1. Interactive Mesh Gradients (Gradientes de Malha)
Cores fluidas que se misturam e se movem organicamente. Frequentemente implementadas via WebGL/Shaders para garantir alta performance.
- **Uso:** Fundos dinâmicos que reagem ao movimento do mouse ou scroll.
- **Ferramentas:** Three.js, GLSL, Framer Motion.

## 2. Spotlight Reveal (Efeito Lanterna)
Uma técnica onde uma máscara (mask-image) segue o cursor para revelar uma camada oculta, mudar a saturação ou iluminar uma área específica.
- **Uso:** Destaque de produtos, revelação de cores (como o efeito grayscale para colorido que usamos na Hero).
- **Implementação:** CSS `mask-image` ou `radial-gradient` dinâmico.

## 3. Noise/Grain Shaders (Textura de Ruído)
Adição de uma camada sutil de grão ou ruído sobre a interface. Isso remove o aspecto "perfeito demais" do digital, conferindo uma estética de cinema ou papel premium.
- **Uso:** Sobreposição em gradientes para evitar "banding" (degraus de cor) e adicionar sofisticação.

## 4. Particle Systems (Sistemas de Partículas)
Elementos geométricos ou pontos que interagem com o mouse, simulando gravidade, magnetismo ou conexões de rede.
- **Uso:** Visualização de dados, conceitos de IA e conectividade.

## 5. Kinetic Typography (Tipografia Cinética)
Texto que se deforma, escala ou muda de peso conforme a interação do usuário.
- **Uso:** Hero sections de alto impacto onde o texto é o protagonista.

## 6. Glassmorphism (Efeito Vidro)
Uso de `backdrop-filter: blur()` combinado com transparências sutis e bordas finas para simular vidro fosco.
- **Uso:** Cards, menus de navegação e modais.

---
*Documento criado para referência de evolução visual da Flow In Tic.*
