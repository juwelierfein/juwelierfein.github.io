---
layout: ../layouts/Page.astro
title: "Kontakt"
description: "Schreiben Sie uns! Einfach an kontakt@info-juwelier-fein.de oder nutzen Sie das untenstehende Kontaktformular. Natürlich erreichen Sie uns ebenfalls telefonisch unter 06721 3087840."
---


Mit unserem Kontaktformular geht es allerdings am schnellsten.


<form action="https://formspree.io/f/mdorbeya" method="POST" class="simple-form">
<input type="hidden" name="_subject" value="Kontaktanfrage Website" />
<div class="field">
<label for="k-name">Name:</label>
<input type="text" id="k-name" name="name" required />
</div>
<div class="field">
<label for="k-email">E-Mail:</label>
<input type="email" id="k-email" name="_replyto" required />
</div>
<div class="field">
<label for="k-message">Nachricht:</label>
<textarea id="k-message" name="message" rows="5" required></textarea>
</div>
<button class="submit--button" type="submit">Nachricht senden</button>
</form>
