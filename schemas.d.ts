import {
  CollectionTypeSchema,
  StringAttribute,
  RequiredAttribute,
  SetMinMaxLength,
  JSONAttribute,
  DefaultTo,
  RelationAttribute,
  DateTimeAttribute,
  PrivateAttribute,
  EmailAttribute,
  UniqueAttribute,
  PasswordAttribute,
  BooleanAttribute,
  EnumerationAttribute,
  IntegerAttribute,
  DecimalAttribute,
  SetMinMax,
  SingleTypeSchema,
  UIDAttribute,
  ComponentAttribute,
  MediaAttribute,
  RichTextAttribute,
  DynamicZoneAttribute,
  ComponentSchema,
  TextAttribute,
} from '@strapi/strapi';

export interface AdminPermission extends CollectionTypeSchema {
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    subject: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: JSONAttribute & DefaultTo<{}>;
    conditions: JSONAttribute & DefaultTo<[]>;
    role: RelationAttribute<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface AdminUser extends CollectionTypeSchema {
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    username: StringAttribute;
    email: EmailAttribute &
      RequiredAttribute &
      PrivateAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    registrationToken: StringAttribute & PrivateAttribute;
    isActive: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    roles: RelationAttribute<'admin::user', 'manyToMany', 'admin::role'> &
      PrivateAttribute;
    blocked: BooleanAttribute & PrivateAttribute & DefaultTo<false>;
    preferedLanguage: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::user', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminRole extends CollectionTypeSchema {
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    code: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute;
    users: RelationAttribute<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: RelationAttribute<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'admin::role', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface AdminApiToken extends CollectionTypeSchema {
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    description: StringAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }> &
      DefaultTo<''>;
    type: EnumerationAttribute<['read-only', 'full-access']> &
      DefaultTo<'read-only'>;
    accessKey: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFile extends CollectionTypeSchema {
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute & RequiredAttribute;
    alternativeText: StringAttribute;
    caption: StringAttribute;
    width: IntegerAttribute;
    height: IntegerAttribute;
    formats: JSONAttribute;
    hash: StringAttribute & RequiredAttribute;
    ext: StringAttribute;
    mime: StringAttribute & RequiredAttribute;
    size: DecimalAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
    previewUrl: StringAttribute;
    provider: StringAttribute & RequiredAttribute;
    provider_metadata: JSONAttribute;
    related: RelationAttribute<'plugin::upload.file', 'morphToMany'>;
    folder: RelationAttribute<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      PrivateAttribute;
    folderPath: StringAttribute &
      RequiredAttribute &
      PrivateAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUploadFolder extends CollectionTypeSchema {
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    pathId: IntegerAttribute & RequiredAttribute & UniqueAttribute;
    parent: RelationAttribute<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: RelationAttribute<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: StringAttribute &
      RequiredAttribute &
      SetMinMax<{
        min: 1;
      }>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsPermission extends CollectionTypeSchema {
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: StringAttribute & RequiredAttribute;
    role: RelationAttribute<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsRole extends CollectionTypeSchema {
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    description: StringAttribute;
    type: StringAttribute & UniqueAttribute;
    permissions: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginUsersPermissionsUser extends CollectionTypeSchema {
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 3;
      }>;
    email: EmailAttribute &
      RequiredAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: StringAttribute;
    password: PasswordAttribute &
      PrivateAttribute &
      SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: StringAttribute & PrivateAttribute;
    confirmationToken: StringAttribute & PrivateAttribute;
    confirmed: BooleanAttribute & DefaultTo<false>;
    blocked: BooleanAttribute & DefaultTo<false>;
    role: RelationAttribute<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface PluginI18NLocale extends CollectionTypeSchema {
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: StringAttribute &
      SetMinMax<{
        min: 1;
        max: 50;
      }>;
    code: StringAttribute & UniqueAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiBlogPagBlogPag extends SingleTypeSchema {
  info: {
    singularName: 'blog-pag';
    pluralName: 'blog-pags';
    displayName: 'BlogPage';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & DefaultTo<'Our Blog'>;
    slug: UIDAttribute<'api::blog-pag.blog-pag', 'title'>;
    pageInfo: ComponentAttribute<'layout.page-info', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::blog-pag.blog-pag',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::blog-pag.blog-pag',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCompanyInfoCompanyInfo extends SingleTypeSchema {
  info: {
    singularName: 'company-info';
    pluralName: 'company-infos';
    displayName: 'CompanyInfo';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    logo: MediaAttribute;
    socialLinks: ComponentAttribute<'config.social-link', true>;
    companyEmail: StringAttribute & RequiredAttribute;
    companyName: StringAttribute & RequiredAttribute;
    vat: StringAttribute;
    companyAddress: StringAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::company-info.company-info',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::company-info.company-info',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCourseCourse extends CollectionTypeSchema {
  info: {
    singularName: 'course';
    pluralName: 'courses';
    displayName: 'Course';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & UniqueAttribute;
    description: RichTextAttribute;
    slug: UIDAttribute<'api::course.course', 'title'> & RequiredAttribute;
    images: MediaAttribute;
    tags: RelationAttribute<'api::course.course', 'oneToMany', 'api::tag.tag'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::course.course',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiCoursesPageCoursesPage extends SingleTypeSchema {
  info: {
    singularName: 'courses-page';
    pluralName: 'courses-pages';
    displayName: 'CoursesPage';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & DefaultTo<'Our Courses'>;
    slug: UIDAttribute<'api::courses-page.courses-page', 'title'> &
      RequiredAttribute;
    pageInfo: ComponentAttribute<'layout.page-info'>;
    excludedCourses: RelationAttribute<
      'api::courses-page.courses-page',
      'oneToMany',
      'api::course.course'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::courses-page.courses-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::courses-page.courses-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiFooterFooter extends SingleTypeSchema {
  info: {
    singularName: 'footer';
    pluralName: 'footers';
    displayName: 'footer';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    socialLinks: ComponentAttribute<'config.social-link', true>;
    footerMenu: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'api::menu.menu'
    >;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::footer.footer',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiHeaderHeader extends SingleTypeSchema {
  info: {
    singularName: 'header';
    pluralName: 'headers';
    displayName: 'header';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    showLogo: BooleanAttribute & RequiredAttribute & DefaultTo<true>;
    menu: RelationAttribute<'api::header.header', 'oneToOne', 'api::menu.menu'>;
    socialLinks: ComponentAttribute<'config.social-link', true>;
    showProfileLink: BooleanAttribute & RequiredAttribute & DefaultTo<true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::header.header',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiHomePageHomePage extends SingleTypeSchema {
  info: {
    singularName: 'home-page';
    pluralName: 'home-pages';
    displayName: 'HomePage';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      DefaultTo<'Home'>;
    hero: ComponentAttribute<'layout.hero'>;
    servicesPreview: ComponentAttribute<'layout.services-preview'>;
    featuredCourse: ComponentAttribute<'layout.featured-course'>;
    postsSelection: ComponentAttribute<'blog.posts-selection'>;
    dynamicHomeSection: DynamicZoneAttribute<
      ['layout.newsletter-form', 'layout.mission']
    >;
    seo: ComponentAttribute<'seo.seoinformation'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::home-page.home-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiMenuMenu extends CollectionTypeSchema {
  info: {
    singularName: 'menu';
    pluralName: 'menus';
    displayName: 'menu';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    menuItems: ComponentAttribute<'layout.link', true>;
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    slug: UIDAttribute<'api::menu.menu', 'name'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::menu.menu', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiPostPost extends CollectionTypeSchema {
  info: {
    singularName: 'post';
    pluralName: 'posts';
    displayName: 'Post';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    content: RichTextAttribute & RequiredAttribute;
    title: StringAttribute &
      RequiredAttribute &
      UniqueAttribute &
      SetMinMaxLength<{
        minLength: 4;
        maxLength: 150;
      }>;
    slug: UIDAttribute<'api::post.post', 'title'> & RequiredAttribute;
    cover: MediaAttribute;
    authors: RelationAttribute<'api::post.post', 'oneToMany', 'admin::user'>;
    tags: RelationAttribute<'api::post.post', 'oneToMany', 'api::tag.tag'>;
    seo: ComponentAttribute<'seo.seoinformation'>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::post.post', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::post.post', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface ApiSeoConfigSeoConfig extends SingleTypeSchema {
  info: {
    singularName: 'seo-config';
    pluralName: 'seo-configs';
    displayName: 'seoConfig';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    defaultSeo: ComponentAttribute<'seo.seoinformation'>;
    seoImage: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::seo-config.seo-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::seo-config.seo-config',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiServiceService extends CollectionTypeSchema {
  info: {
    singularName: 'service';
    pluralName: 'services';
    displayName: 'Service';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    description: RichTextAttribute;
    slug: UIDAttribute<'api::service.service', 'name'>;
    cover: MediaAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::service.service',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiStaticPageStaticPage extends CollectionTypeSchema {
  info: {
    singularName: 'static-page';
    pluralName: 'static-pages';
    displayName: 'staticPage';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: StringAttribute & RequiredAttribute & UniqueAttribute;
    slug: UIDAttribute<'api::static-page.static-page', 'title'> &
      RequiredAttribute;
    pageInfo: ComponentAttribute<'layout.page-info', true>;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    publishedAt: DateTimeAttribute;
    createdBy: RelationAttribute<
      'api::static-page.static-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
    updatedBy: RelationAttribute<
      'api::static-page.static-page',
      'oneToOne',
      'admin::user'
    > &
      PrivateAttribute;
  };
}

export interface ApiTagTag extends CollectionTypeSchema {
  info: {
    singularName: 'tag';
    pluralName: 'tags';
    displayName: 'Tag';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  attributes: {
    name: StringAttribute & RequiredAttribute & UniqueAttribute;
    slug: UIDAttribute<'api::tag.tag', 'name'> & RequiredAttribute;
    createdAt: DateTimeAttribute;
    updatedAt: DateTimeAttribute;
    createdBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
    updatedBy: RelationAttribute<'api::tag.tag', 'oneToOne', 'admin::user'> &
      PrivateAttribute;
  };
}

export interface BlogPostsSelection extends ComponentSchema {
  info: {
    displayName: 'postsSelection';
  };
  attributes: {
    heading: StringAttribute;
    featured_posts: RelationAttribute<
      'blog.posts-selection',
      'oneToMany',
      'api::post.post'
    >;
  };
}

export interface ConfigSocialLink extends ComponentSchema {
  info: {
    displayName: 'socialLink';
    icon: 'backward';
  };
  attributes: {
    socialMedia: EnumerationAttribute<
      ['github', 'youtube', 'twitter', 'facebook', 'whatsapp']
    > &
      RequiredAttribute;
    link: StringAttribute & RequiredAttribute;
  };
}

export interface LayoutFeaturedCourse extends ComponentSchema {
  info: {
    displayName: 'featuredCourse';
    icon: 'school';
    description: '';
  };
  attributes: {
    course: RelationAttribute<
      'layout.featured-course',
      'oneToOne',
      'api::course.course'
    >;
    heading: StringAttribute;
    announcement: TextAttribute;
  };
}

export interface LayoutHero extends ComponentSchema {
  info: {
    displayName: 'hero';
    icon: 'window-maximize';
  };
  attributes: {
    callToAction: StringAttribute & RequiredAttribute;
    image: MediaAttribute;
    buttons: ComponentAttribute<'layout.link', true>;
  };
}

export interface LayoutLink extends ComponentSchema {
  info: {
    displayName: 'link';
    icon: 'arrow-right';
  };
  attributes: {
    label: StringAttribute & RequiredAttribute;
    url: StringAttribute & RequiredAttribute;
  };
}

export interface LayoutMission extends ComponentSchema {
  info: {
    displayName: 'mission';
    icon: 'anchor';
  };
  attributes: {
    heading: StringAttribute & RequiredAttribute & DefaultTo<'Our Mission'>;
    content: TextAttribute & RequiredAttribute;
    showLogo: BooleanAttribute & RequiredAttribute & DefaultTo<true>;
  };
}

export interface LayoutNewsletterForm extends ComponentSchema {
  info: {
    displayName: 'newsletterForm';
    icon: 'align-justify';
  };
  attributes: {
    heading: StringAttribute & RequiredAttribute;
    subheading: TextAttribute;
  };
}

export interface LayoutPageInfo extends ComponentSchema {
  info: {
    displayName: 'PageInfo';
    icon: 'angry';
    description: '';
  };
  attributes: {
    content: RichTextAttribute;
    cover: MediaAttribute;
    seo: ComponentAttribute<'seo.seoinformation'>;
    excluded_tags: RelationAttribute<
      'layout.page-info',
      'oneToMany',
      'api::tag.tag'
    >;
  };
}

export interface LayoutServicesPreview extends ComponentSchema {
  info: {
    displayName: 'servicesPreview';
    icon: 'atom';
  };
  attributes: {
    services: RelationAttribute<
      'layout.services-preview',
      'oneToMany',
      'api::service.service'
    >;
  };
}

export interface SeoSeoinformation extends ComponentSchema {
  info: {
    displayName: 'seoinformation';
    icon: 'search';
  };
  attributes: {
    seoTitle: StringAttribute;
    seoDescription: TextAttribute;
  };
}

declare global {
  namespace Strapi {
    interface Schemas {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::blog-pag.blog-pag': ApiBlogPagBlogPag;
      'api::company-info.company-info': ApiCompanyInfoCompanyInfo;
      'api::course.course': ApiCourseCourse;
      'api::courses-page.courses-page': ApiCoursesPageCoursesPage;
      'api::footer.footer': ApiFooterFooter;
      'api::header.header': ApiHeaderHeader;
      'api::home-page.home-page': ApiHomePageHomePage;
      'api::menu.menu': ApiMenuMenu;
      'api::post.post': ApiPostPost;
      'api::seo-config.seo-config': ApiSeoConfigSeoConfig;
      'api::service.service': ApiServiceService;
      'api::static-page.static-page': ApiStaticPageStaticPage;
      'api::tag.tag': ApiTagTag;
      'blog.posts-selection': BlogPostsSelection;
      'config.social-link': ConfigSocialLink;
      'layout.featured-course': LayoutFeaturedCourse;
      'layout.hero': LayoutHero;
      'layout.link': LayoutLink;
      'layout.mission': LayoutMission;
      'layout.newsletter-form': LayoutNewsletterForm;
      'layout.page-info': LayoutPageInfo;
      'layout.services-preview': LayoutServicesPreview;
      'seo.seoinformation': SeoSeoinformation;
    }
  }
}
