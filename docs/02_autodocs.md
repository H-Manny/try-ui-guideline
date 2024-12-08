# Automatic documentation and Storybook

**Storybook Autodocs**は、UIコンポーネントの詳しい説明書を簡単に作れる便利なツールです。<br />
**Autodocs**を使うと、あなたの作ったコンポーネントの説明を、まるで生きている図鑑のように見せることができます。<br />
*MDX*や*Doc Blocks*という特別な書き方を使えば、コンポーネントの働きをもっとわかりやすく説明することも可能です。

Storybookは、コンポーネントに関するいろいろな情報（*args*、*argTypes*、*parameters*など）を自動的に集めて、コンポーネントのドキュメントページを勝手に作ってくれます。<br />
このドキュメントページは、UIコンポーネントの一覧を見られるサイドバーの一番上に表示されます。

![Storybook autodocs](https://storybook.js.org/docs-assets/8.4/writing-docs/autodocs.png)

## 自動ドキュメンテーションの設定
**Autodocs**は、特別なタグをつけることで設定します。<br />
**CSFファイル**に**autodocsタグ**が付いたストーリーが一つでもあれば、そのコンポーネントのドキュメントページが自動で作られます。

プロジェクト全体のコンポーネントのドキュメントを自動で作りたい場合は、`.storybook/preview.js|ts`ファイルのタグに`autodocs`を追加します。

*JS: .storybook/preview.js*
```javascript
export default {
  // ...rest of preview
  //👇 Enables auto-generated documentation for all stories
  tags: ['autodocs'],
};
```

コンポーネント（またはストーリー）レベルで有効にすることもできる：

*JS: Button.stories.js*
```javascript
import { Button } from './Button';

export default {
  component: Button,
  //👇 Enables auto-generated documentation for this component and includes all stories in this file
  tags: ['autodocs'],
};
```

タグを削除することで、特定のコンポーネントの自動ドキュメントを無効にすることができます：

*JS: Page.stories.js*
```javascript
import { Page } from './Page';

export default {
  component: Page,
  // 👇 Disable auto-generated documentation for this component
  tags: ['!autodocs'],
};
```

同様に、タグを削除することで、自動ドキュメント・ページから特定のストーリーを除外することができる：

*JS: Button.stories.js*
```javascript
import { Button } from './Button';

export default {
  component: Button,
  //👇 Enables auto-generated documentation for this component and includes all stories in this file
  tags: ['autodocs'],
};

export const UndocumentedStory = {
  // 👇 Removes this story from auto-generated documentation
  tags: ['!autodocs'],
};
```

### Configure
*Storybook*では、タグだけでなく、設定ファイル（例えば、`.storybook/main.js`など）を調整することで、ドキュメントの作り方を細かく設定できます。<br />
この設定ファイルでは、様々なオプションを使って、ドキュメントの表示方法や内容を自分好みに変えることができます。

*JS: .storybook/main.js*
```javascript
export default {
  // Replace your-framework with the framework you are using (e.g., react-webpack5, vue3-vite)
  framework: '@storybook/your-framework',
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  docs: {
    //👇 See the table below for the list of supported options
    defaultName: 'Documentation',
  },
};
```

| Option | Description |
| --- | --- |
| defaultName |自動生成されたドキュメントページの名前を変更する<br />Default: `docs: { defaultName:'Documentation' }` |

### Write a custom template
Storybookでは、デフォルトのドキュメントのデザインを、設定ファイル（例えば、`.storybook/preview.js`）を使って自由にカスタマイズできます。

具体的には、**docs**という設定項目を使って、ドキュメントの見た目を決めるための独自の関数を指定します。
この関数は、*Reactコンポーネント*を返すことで、ドキュメントのページを自由にデザインできます。

*JS: .storybook/preview.jsx*
```javascript
import { Title, Subtitle, Description, Primary, Controls, Stories } from '@storybook/blocks';

export default {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories />
        </>
      ),
    },
  },
};
```

コードスニペットを詳しく見ていきましょう。Storybookを起動すると、デフォルトのテンプレートが以下のようなカスタムテンプレートに置き換わります。

1. **Title, Subtitle, Description**: *Doc Block*から取得したコンポーネントのメタデータを含むヘッダーです。
2. **Primary**: *Doc Block*でファイルに定義された最初のストーリーと、コンポーネントのサイズ調整に便利なUIコントロールのセットです。
3. **Controls**: *Doc Block*でストーリーに定義されたすべての関連する引数とその種類を示す、対話型の表です。
4. **Stories**: 残りのストーリーの概要です。

#### With MDX
**MDX**を使ってドキュメントテンプレートを作成することもできます。これは、*React*以外のプロジェクトで、*JSX*を直接処理できない場合に特に便利です。<br />

通常、MDXファイルはただのドキュメントとして扱われますが、**`isTemplate`というプロパティをメタデータに設定することで、ドキュメントテンプレートとして指定**できます。例えば:

*JS: DocumentationTemplate.mdx*
```mdx
import { Meta, Title, Primary, Controls, Stories } from '@storybook/blocks';

{/*
  * 👇 The isTemplate property is required to tell Storybook that this is a template
  * See https://storybook.js.org/docs/api/doc-blocks/doc-block-meta
  * to learn how to use
*/}

<Meta isTemplate />

<Title />

# Default implementation

<Primary />

## Inputs

The component accepts the following inputs (props):

<Controls />

---

## Additional variations

Listed below are additional variations of the component.

<Stories />
```
その後、`.storybook/preview.js|ts`または個々のストーリーファイルにインポートして使用することができます：

*JS: .storybook/preview.js*
```javascript
import DocumentationTemplate from './DocumentationTemplate.mdx';

export default {
  parameters: {
    docs: {
      page: DocumentationTemplate,
    },
  },
};
```
> [!TIP]
> 単一のコンポーネントのドキュメントページを上書きしたい場合は、*MDX*ファイルを作成し、`<Meta title="..." />`などのメタタグを直接記述する方法がおすすめです。*Doc Block*を経由する方法もありますが、MDXのメタタグを使う方がより柔軟で、直接的な記述が可能です。

### Generate a table of contents : 目次の作成
Storybookが自動生成するドキュメントページは非常に長く、目的の情報を探しにくいことがあります。<br />
目次機能を有効にすると、ドキュメントページに目次が表示され、目的のセクションへ簡単に移動できるようになります。

この機能を有効にするには、Storybookの設定ファイル（`.storybook/preview.js|ts`）を編集し、`docs.toc`を*true*に設定します。

*JS: .storybook/preview.jsx*
```javascript
export default {
  parameters: {
    docs: {
      toc: true, // 👈 Enables the table of contents
    },
  },
};
```

### Configure the table of contents : 目次の設定
デフォルトでは、ドキュメントページの目次には、自動的に生成された見出しの一部しか表示されません。<br />
しかし、目次をカスタマイズして、*tocプロパティ*にパラメータを追加し、表示する見出しのレベルや目次全体の構造を調整することができます。

| Option | Description |
| --- | --- |
| disable | ドキュメントページの目次を隠す<br />`toc: { disable: true }` |
| headingSelector | 目次の見出しリストを定義します。<br />`toc: { headingSelector: 'h1, h2, h3' }` |
| ignoreSelector | 特定の見出しやストーリーを無視するように目次を設定します。<br />デフォルトでは、目次はストーリーブロック内のすべてのコンテンツを無視します。<br />`toc: { ignoreSelector: '.docs-story h2' }` |
| title | 目次のタイトルキャプションを定義します。*文字列*、*null*、React要素のいずれかを受け入れます。<br />`toc: { title: 'Table of Contents' }` |
| unsafeTocbotOptions | TocBot設定オプションの追加<br />`toc: { unsafeTocbotOptions: { orderedList: true } }` |

> [!NOTE]
> *contentsSelector*, *headingSelector*, *ignoreSelector*プロパティでさらにカスタマイズできます。<br />
> 詳しくは**Tocbotのドキュメント**を参照してください。

*JS: .storybook/preview.jsx*
```javascript
export default {
  parameters: {
    docs: {
      toc: {
        contentsSelector: '.sbdocs-content',
        headingSelector: 'h1, h2, h3',
        ignoreSelector: '#primary',
        title: 'Table of Contents',
        disable: false,
        unsafeTocbotOptions: {
          orderedList: false,
        },
      },
    },
  },
};
```
#### Component-level configuration
特定のストーリーの目次をカスタマイズしたい場合は、そのストーリーのメタデータに**toc**プロパティを追加し、詳細な設定を行います。
例えば、特定のストーリーの目次を隠す必要がある場合、ストーリーを以下のように調整する：

*JS: MyComponent.stories.js*
```javascript
import { MyComponent } from './MyComponent';

export default {
  component: MyComponent,
  tags: ['autodocs'],
  parameters: {
    docs: {
      toc: {
        disable: true, // 👈 Disables the table of contents
      },
    },
  },
};
```
### Customize component documentation
Storybookの自動ドキュメント機能（*Autodocs*）は、開発効率を向上させる便利なツールですが、<br />
より詳細な情報を提供したい場合や、ドキュメントの構造を細かく制御したい場合は、*MDX*とStorybookの*Doc Blocks*を組み合わせたカスタムドキュメントを作成することをおすすめします。

## Advanced configuration : 高度な設定
### 複数のコンポーネントの文書化
複数のコンポーネントを一緒に文書化すると便利な場合があります。 例えば、コンポーネント・ライブラリの*ButtonGroupコンポーネント*と*Buttonコンポーネント*は、互いに存在しなければ意味をなさないかもしれません。

*Autodocs*では、**メイン**となるコンポーネントとその関連する部品（サブコンポーネント）をまとめてドキュメント化できます。

*JS: List.stories.js|jsx* :eyes:
```javascript
// Assuming List and ListItem are defined as functions or classes
function List(props) {
  // implementation
}

function ListItem(props) {
  // implementation
}

// Equivalent to the Storybook configuration
const storyConfig = {
  component: List,
  subcomponents: { ListItem },
};

// Equivalent to the Empty story
const emptyStory = {};

// Equivalent to the OneItem story
const oneItemStory = {
  render: (args) => {
    const list = document.createElement('div');
    list.innerHTML = `
      <div>
        <div></div>
      </div>
    `;
    return list;
  },
};
```
![Subcomponents in ArgTypes doc block](https://storybook.js.org/docs-assets/8.4/writing-stories/doc-block-arg-types-subcomponents-for-list.png)

メインとなるコンポーネントとその部品（サブコンポーネント）は、それぞれタブで区切って表示されます。<br />
各タブの名前は、部品ごとに設定した名前になります。<br />
複数のコンポーネントをまとめて、より複雑なドキュメントを作成したい場合は、*MDX*を使用すると柔軟にカスタマイズできます。