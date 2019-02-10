1.  Útskýrðu stuttlega eftirfarandi hugtök og hlutverk: (1%)

  -  GPU
  -  Pixels
  -  Frame buffer, raster-scan and refresh rate
  -  WebGL og OpenGL

      **Svar**  
      - **GPU:** (_*Graphics Processing Unit*_) er vélbúnaður sem er sérhæfður í að reikna flókna stærðfræði til að framkalla ramma á skjáinn.

      - **Pixels:** Skjáir eru búnir til úr pixlum. Einn pixel er minnsta eining sem getur verið lýst up á skjá, þeir eru oft það margir að erfitt er að sjá hvern og einn með berum augum. Þegar rammar eru búnir til, er reiknað hvaða pixlar eiga vera í gangi og hvaða lit/birtustig skulu þeir vera með.

      - **Frame buffer, raster-scan and refresh rate:**  
      **Frame buffer:** Staður í GPU minni sem geymir næsta ramma (pixlana) fyrir skjáinn.  
      **Raster-scan:** Punktur/punktar(MSAA) eru settir í hvern pixel, GPU reiknar út hversu mikið hlutir eru inná hverjum pixel, eftir því hvað hlutirnir eru mikið inná hverjum pixel reiknar hann út hvað sá pixel á að vera bjartur/daufur.  
      **Refresh rate:** Hversu margir rammar eru framkallaðir á einni sekúndu.

      - **WebGL og OpenGL:** OpenGL er API til að hægt sé að kóða fyrir mismunandi útfærslur af GPU's á einum standard, OpenGL er skrifað í C. WebGL er JavaScript API fyrir OpenGL sem notað er í vöfrum og hefur þ.á.m. aðgang að GPU í gegnum _*<canvas\>*_.

2.  Útskýrðu ítarlega og tæknilega (án kóða) hvernig rendering pipeline virkar í WebGL. Notaðu skýringamynd þér til stuðnings. (2%)

    **Svar**  
    - Rendering pipeline gerist í GPU og þjónar þeim tilgangi að breyta 3d _*umhverfi*_ yfir í 2d _*pixla*_ á skjáinn.

    - Rendering pipeline á sér stað margoft á sekúndu og er keyrt í multithreading umhverfi.

    - Tíminn á því þrepi sem tekur lengst, verður tíminn sem það tekur að framkalla rammann.

    - Ferlið er eftirfarandi: Data(binary)>Vertex Shader>Primitive Assembly>Rasterization>Fragment Shader>Framebuffer.  
    **Data(binary):** Pure vertex data frá CPU hent á GPU.  
    **Vertex Shader:** Búnir eru til punktar í 3d space. Hugað er að hvort punktar eru inni á skjánnum eða ekki, líka hvort þeir séu of langt í burtu.  
    **Primitive Assembly** Reikna út þríhyrninga, punkta eða línur út frá verticies í 3d space miðað við punktana sem gefnir eru í skrefinu hér á undan.  
    **Rasterization:** Þríhyrningarnir sem búið er að reikna út er breytt í pixla, og með því fylgir að reikna hvaða pixla á skjánnum þarf í að mynda þá þrýhirninga. Hér er tækni eins og anti-aliasing eða MSAA notuð til að gera það smooth.  
    **Fragment Shader:** Texture, litir, dýptir o.fl. er applied.  
    **Framebuffer:** Rammanum er dælt hingað inn í pixlum og er geymdur í minninu í GPU, tilbúinn fyrir skjáinn.

3.  Hvað er WebGL Shaders og Graphics Library Shader Language (GLSL) og hvert er þeirra hlutverk. Sjá t.d. grein: <https://webgl2fundamentals.org/webgl/lessons/webgl-shaders-and-glsl.html> (2%)

    **Svar**  
    **WebGL Shaders:** WebGL Shaders eru föll sem innihalda vertex shader og fragment shader sem eru settir saman í forrit. Forrit sem keyra WebGL hafa mörg "shader forrit".  
    **GLSL:** GLSL er forritunartungumál sem er sérhæft í því að reikna út shaders í graffík, þá eiginlega einungis stærðfræði. Oft á tíðum er GLSL að reikna út rasterization sem ég hef útskýrt hvað er.

4.  Búðu til 3D hlut frá grunni að eigin vali með áferð (lit eða texture, ljós og skugga). Þú getur valið um að vinna með WebGL eða Three.js. Notaðu e. transform fylkin (translation, rotation, scale). Skrifaðu íslenskar skýringar með kóðanum. (7%)

    **Svar**  
    [Verkefni 2 - Pétur Steinn (three.js)](http://petursteinn.github.io/FORR3FV05EU-PSG/Verkefni_2/)
