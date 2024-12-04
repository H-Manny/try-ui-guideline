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
