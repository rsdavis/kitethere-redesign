<template>
  <div class="about">
    <div class="about__content">
      
      <nuxt-link to="map">
        <img class="about__img" src="https://res.cloudinary.com/docvozwpw/image/upload/c_scale,w_609/v1541205966/map_snap.png" alt="">
      </nuxt-link>
      
      <div class="about__message">
        <p>KiteThere is a social site focused on gathering local knowledge about kiteboarding spots around the world!</p>
        <p>How many times have you zommed and panned around with Google satellite to scout for potential kiting locations, yet you still don't have much information. How do I get there? Can I park for free? Is this a popular spot? Where's a good place to launch? What should I watch out for? Can I even KiteThere?!</p>
        <p>KiteThere is finding the answers to these questions from the local expects who kite these spots regularly.</p>
        <p>Get started by adding your favorite spot to the map!</p>
      </div>
    </div>
  </div>
</template>

<style>
.about {
  background-color: rgb(245, 245, 245);
  display: grid;
  grid-template-columns: var(--layout);
}
.about__content {
  grid-column: 2;
  padding: 100px 0 100px 0;
  display: grid;
  grid-template-columns: 3fr 4fr;
  grid-gap: 40px;
}
.about__img {
  width: 100%;
}
.about__message {
  color: rgb(36, 50, 67);
  display: grid;
  grid-gap: 20px;
  font-size: 24px;
  align-content: start;
  text-align: right;
}
@media only screen and (min-width: 800px) {
  .about__message { font-size: 18px; }
}
@media only screen and (min-width: 1000px) {
  .about__message { font-size: 24px; }
}
@media only screen and (max-width: 800px) {
  .about__content {
    grid-template-columns: 1fr;
  }
  .about__message {
    text-align: left;
    font-size: 20px;
  }
}
</style>