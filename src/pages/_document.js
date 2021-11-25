import React from 'react';
import { ServerStyleSheet } from 'styled-components';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';

/* eslint-disable react/jsx-props-no-spreading */
class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    const { helmet } = this.props;

    const htmlAttrs = helmet.htmlAttributes.toComponent();
    const bodyAttrs = helmet.bodyAttributes.toComponent();

    const favicons = [
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/favicons/apple-touch-icon.png?v=6',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicons/favicon-32x32.png?v=6',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicons/favicon-16x16.png?v=6',
      },
      {
        rel: 'manifest',
        href: '/favicons/site.webmanifest',
      },
    ];

    const meta = [
      // Use minimum-scale=1 to enable GPU rasterization
      {
        name: 'viewport',
        content:
          'user-scalable=0, initial-scale=1 minimum-scale=1, width=device-width, height=device-height',
      },
    ];

    return (
      <Html {...htmlAttrs}>
        <Head>
          {meta.map((tag, index) => (
            <meta key={index} {...tag} /> // eslint-disable-line react/no-array-index-key
          ))}
          {this.props.styleTags}
          {favicons.map((link, index) => (
            <link key={index} {...link} /> // eslint-disable-line react/no-array-index-key
          ))}
          {Object.keys(helmet)
            .filter((el) => el !== 'htmlAttributes' && el !== 'bodyAttributes')
            .map((el) => this.props.helmet[el].toComponent())}
        </Head>
        <body {...bodyAttrs}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
