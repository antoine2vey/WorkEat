import React, { Component } from 'react';

class Article extends Component {
  render() {
    return (
      <div>
        <div className="article">
          <div className="article__header">
            <h1 className="article__title">Ceci est le premier article de votre blog</h1>
            <div className="article__opacity"></div>
          </div>
          <div className="article__container">
            <h2 className="article__subtitle">Ceci est la partie une de l'article</h2>
            <p className="article__content">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum vel ante volutpat, molestie mi nec, commodo purus. Pellentesque mauris magna, hendrerit euismod ex quis, volutpat pretium nulla. Maecenas fringilla nisl sit amet imperdiet blandit. Pellentesque eu semper arcu. Quisque vitae quam et lectus sagittis maximus sed eget neque. Duis eget neque pharetra, tempus lorem at, gravida diam. Ut pharetra porttitor nisl. Nullam pulvinar hendrerit magna.</p>
            <p className="article__content">Mauris commodo mi massa, tincidunt vestibulum ex pretium a. Vestibulum at nulla nisl. Nullam faucibus, quam non placerat feugiat, lorem ante sagittis ipsum, eu vehicula metus dui suscipit tortor. Vestibulum quam velit, facilisis id lorem vel, tristique consectetur ante. Nunc pulvinar porta dui id vestibulum. Cras ut fringilla tortor, sed eleifend ligula. Ut consectetur ut ante eu condimentum. Mauris nec consequat nunc.</p>
            <h2 className="article__subtitle">Ceci est seconde partie de l'article</h2>
            <p className="article__content">Fusce sapien justo, vehicula et commodo ac, luctus in velit. Sed posuere dui lorem, non blandit massa tincidunt at. Cras sed dui tortor. Duis lacinia tempus interdum. Sed gravida, risus sit amet tincidunt eleifend, augue augue convallis diam, vitae tincidunt nisi sem et metus. Vivamus sed odio vitae orci suscipit luctus quis sed diam. Cras tempus vitae arcu eget pellentesque. Quisque facilisis libero viverra fermentum pellentesque. Nam quis hendrerit libero. Maecenas rhoncus faucibus varius.</p>
            <p className="article__content">Integer non aliquam justo. Quisque eleifend ante eu mi accumsan, at suscipit eros pretium. Pellentesque nulla neque, mollis et metus non, mollis lobortis diam. Aliquam interdum dignissim est eget tincidunt. Ut nunc odio, aliquet eget quam in, fringilla pulvinar nisl. Donec at mattis augue. Donec tincidunt augue bibendum quam rutrum, in vehicula elit viverra. Phasellus varius molestie leo non condimentum.</p>
            <p className="article__content">Suspendisse potenti. Curabitur faucibus convallis posuere. Integer eget nibh non odio egestas placerat eu id enim. Nam metus arcu, mattis non laoreet quis, varius ut sem. Fusce ut dictum sem. Proin ac convallis tellus. Integer non quam lacus. Ut tincidunt pellentesque lacinia. Aliquam facilisis sed justo nec rhoncus. Nulla volutpat enim sit amet dapibus aliquam.</p>
          </div>
        </div>
      </div>
    );
  }
}

export default Article;
