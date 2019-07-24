import Vue from 'vue';
import Router from 'vue-router';
import Index from './views/default/Index';
import AadminLogin from './views/admin/Login';
import UserLogin from './views/default/Login';
import PersonalCenter from './views/default/PersonalCenter';
import ContractTplList from './views/ContractTplList.vue';
import ContractTplCreate from './views/ContractTplCreate.vue';
import ContractTplAttrList from './views/ContractTplAttrList.vue';
import ContractTplAttrCreate from './views/ContractTplAttrCreate.vue';
import ContractList from './views/ContractList';
import ContractCreateS1 from './views/ContractCreateS1';
import ContractAttrSet from './views/ContractAttrSet';
import ContractPreview from './views/ContractPreview';
import ContractView from './views/ContractView';
import ContractTplModify from './views/ContractTplModify';
import ContractTplAttrModify from './views/ContractTplAttrModify';
import TplAttrEdit from './views/TplAttrEdit';
import AttrEdit from './views/AttrEdit.vue';
import UserInfo from './views/default/UserInfo';
import VertifyCode from './views/VertifyCode';
import PhoneBind from './views/PhoneBind';
import IndexConten from './views/default/IndexContent';
import ProductContent from './views/default/ProductContent.vue';
import Register from './views/default/Register';

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: '/',
      name: '',
      redirect: '/index/content'
    },
    {
      path: '/index',
      component: Index,
      children: [
        {
          path: 'content',
          component: IndexConten
        },
        {
          path: 'productcontent',
          component: ProductContent
        }
      ]
    },
    {
      path: '/admin',
      name: 'AadminLogin',
      component: AadminLogin
    },
    {
      path: '/login',
      name: 'UserLogin',
      component: UserLogin
    },
    {
      path: '/regiser',
      name: 'Register',
      component: Register
    },
    {
      path: '/personalcenter',
      name: 'PersonalCenter',
      component: PersonalCenter,
      meta: {
        requireAuth: true // 路由鉴权
      },
      children: [
        {
          path: '/contracttpl/list',
          name: 'ContractTplList',
          component: ContractTplList,
          props: true,
          meta: {
            title: '模板列表'
          }
        },
        {
          path: '/contracttpl/create',
          name: 'ContractTplCreate',
          component: ContractTplCreate,
          props: true,
          meta: {
            title: '创建模板'
          }
        },
        {
          path: '/contracttplattr/list',
          name: 'ContractTplAttrList',
          component: ContractTplAttrList,
          meta: {
            title: '模板属性'
          }
        },
        {
          path: '/contracttplattr/create',
          name: 'ContractTplAttrCreate',
          component: ContractTplAttrCreate,
          props: true,
          meta: {
            title: '编辑模板属性'
          }
        },
        {
          path: '/contract/list',
          name: 'ContractList',
          component: ContractList,
          meta: {
            title: '合同列表'
          }
        },
        {
          path: '/contract/create',
          name: 'ContractCreateS1',
          component: ContractCreateS1,
          meta: {
            title: '选择模板'
          }
        },
        {
          path: '/contract/attrset',
          name: 'ContractAttrSet',
          component: ContractAttrSet,
          meta: {
            title: '设置属性'
          }
        },
        {
          path: '/contract/preview',
          name: 'ContractPreview',
          component: ContractPreview,
          props: true,
          meta: {
            title: '预览合同'
          }
        },
        {
          path: '/contract/view',
          name: 'ContractView',
          component: ContractView,
          meta: {
            title: '查看合同'
          }
        },
        {
          path: '/contracttpl/modify',
          name: 'ContractTplModify',
          component: ContractTplModify,
          meta: {
            title: '修改模板'
          }
        },
        {
          path: '/contacttplattr/modify',
          name: 'ContractTplAttrModify',
          component: ContractTplAttrModify,
          props: true,
          meta: {
            title: '修改模板属性'
          }
        },
        {
          path: '/contacttplattr/edit',
          name: 'TplAttrEdit',
          component: TplAttrEdit,
          meta: {
            title: '编辑模板属性'
          }
        },
        {
          path: '/contactattr/edit',
          name: 'AttrEdit',
          component: AttrEdit,
          meta: {
            title: '编辑合同属性'
          }
        },
        {
          path: '/user/userinfo',
          name: 'UserInfo',
          component: UserInfo,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: '/vertifycode',
          name: 'VertifyCode',
          component: VertifyCode,
          meta: { title: '绑定手机' }
        },
        {
          path: '/bindphone',
          name: 'PhoneBind',
          component: PhoneBind,
          meta: { title: '绑定手机' }
        }
      ]
    }
  ]
});
