<template>
  <div class="about">
    <div class="about__content">
      <img class="about__img" src="http://via.placeholder.com/600x600" alt="">
      <div class="about__message">
        <p>KiteThere is a social site focused on gathering local knowledge about kiteboarding spots around the world!</p>
        <p>How many times have you zommed and panned around with Google satellite to scout for potential kiting locations, yet you still don't have much information. How do I get there? Can I park for free? Is this a popular spot? Where's a good place to launch? What should I watch out for? Can I even KiteThere?!</p>
        <p>KiteThere is finding the answers to these questions from the local expects who kite these spots regularly.</p>
        <p>Get started by adding your favorite spot to the list!</p>
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
  grid-template-columns: 1fr 1fr;
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
    font-size: 24px;
  }
}
</style>