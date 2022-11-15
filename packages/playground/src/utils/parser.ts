import { COMPUTE_RE } from "@view-engine/core";
//@ts-ignore
import * as parser from "@babel/parser";
import MagicString from "magic-string";
import { walkAST } from "ast-walker-scope";

export function parseComputed(obj: any, exclude: string[] = []) {
  for (let i in obj) {
    if (Array.isArray(obj[i]) || exclude.includes(i)) continue;
    if (typeof obj[i] === "object" && obj[i]) {
      parseComputed(obj[i]);
    }
    if (typeof obj[i] === "string" && COMPUTE_RE.test(obj[i])) {
      let body = obj[i].match(COMPUTE_RE)[1];
      const source = new MagicString(body);
      const ast = parser.parse(body, {
        // parse in strict mode and allow module declarations
        sourceType: "module",
      });
      walkAST(ast, {
        enter(node) {
          if (node.type === "Identifier") {
            source.appendLeft(node.start as number, "state.");
          }
        },
      });
      obj[i] = `{{${source.toString()}}}`;
    }
  }
}

export function isContainState(str: string) {
  let ret = false;
  const ast = parser.parse(str, {
    // parse in strict mode and allow module declarations
    sourceType: "module",
  });
  walkAST(ast, {
    enter(node) {
      if (node.type === "Identifier" && node.name === "state") {
        {
          ret = true;
          this.skip();
        }
      }
    },
  });
  return ret;
}

export function analyseService(str: string) {
  let hasState = false;
  let dep: Set<string> = new Set();
  const ast = parser.parse(str, {
    // parse in strict mode and allow module declarations
    sourceType: "module",
  });
  walkAST(ast, {
    enter(node) {
      if (
        node.type === "MemberExpression" &&
        node.object.type === "Identifier"
      ) {
        if (node.object.name === "ctx") {
          dep.add((node.property as any).name);
        }
        if (node.object.name === "state" && !hasState) hasState = true;
      }
    },
  });
  return {
    dependences: [...dep],
    hasState,
  };
}
