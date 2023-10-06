import Handlebars from 'handlebars';

type CompareValue = number | string | symbol | undefined | null | Handlebars.HelperOptions;

Handlebars.registerHelper('ifeq', function <T>(this: T, ...args: CompareValue[]) {
  const options = <Handlebars.HelperOptions>args.pop()!;

  console.log(this, args)
  if (!args) {
    return options.inverse(this);
  }

  if (!args.some((el, _index, arr) => el !== arr[0])) { return options.fn(this); }
  return options.inverse(this);
});

Handlebars.registerHelper('ifnoteq', function <T>(this: T, ...args: CompareValue[]) {
  const options = <Handlebars.HelperOptions>args.pop()!;

  if (!args) {
    return options.inverse(this);
  }

  if (args.some((el, _index, arr) => el !== arr[0])) { return options.fn(this); }
  return options.inverse(this);
});
