import resolve from '@/traverser/resolver';
import {createTraverserLink} from '@/traverser/normalizer';
import executeHook from '@/traverser/traverseHook';
import router from "@/router";


export function lookup({views, path, options}) {
  return resolve(path, options).then(({res, view}) => {
    const type = res['@type'];
    let componentsByType = views.filter(v => v.type === type);

    if (!componentsByType.length) {
      componentsByType = views.filter(v => v.type === '*');
    }

    if (!componentsByType.length) {
      router.app.$root.$bvToast.toast(`Keine Ansicht für den Typ "${type}" gefunden`, {
        title: 'Fehler',
        autoHideDelay: 4000,
        variant: 'danger'
      });
      router.go(-1);
      throw new Error(`Component for type "${type}" could not be found`);
    }

    const componentsByView = componentsByType.filter(v => v.view === view);

    if (componentsByView.length > 1) {
      throw new Error(`Multiple views named "${view}" defined for component with type "${type}"`);
    }

    const componentLookup = componentsByView.find(v => v.view === view);

    if (componentLookup) {
      return {component: componentLookup.component, context: res};
    }

    const defaultViews = componentsByType.filter(v => !v.view);

    if (defaultViews.length > 1) {
      throw new Error(`Multiple default views defined for component with type "${type}"`);
    }

    return {component: defaultViews[0].component, context: res};
  });
}

export function updateComponent({views, path, vm, options}) {
  return lookup({views, path, options}).then(({component, context}) => {
    window.scrollTo(0, 0);
    executeHook(
        component.onTraverse,
        null,
        path,
        options,
    ).then(({key, data}) => {
      const hookContext = context;
      hookContext[key] = data;
      vm.prototype._context = hookContext;
      vm.prototype._component = component;
    }).catch(() => {
      vm.prototype._component = component;
      vm.prototype._context = context;
    });
  }).finally(() => router.app.$store.commit("setLoading", false));
}

export function traverse(item, router, options) {
  const link = createTraverserLink(item, options);
  if (link !== router.app.$route.path) {
    return router.push(link);
  }
}
