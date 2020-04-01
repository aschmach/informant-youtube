"use strict";
const { gateway } = require("./gateway");
const { Youtube } = require("../model");

module.exports = { master, commander };

async function master(req = {}) {
  console.log("starting master");
  if (gateway(req)) {
    return await commander(req.params);
  } else {
    return;
  }
}

async function commander({ trigger }) {
  // console.log('starting commander')
  try {
    console.log({ trigger });
    const sources = await Youtube[trigger].find();
    let iterations = sources.length;
    // iterations = 1;
    for (let i = 0; i < iterations; i++) {
      const source = sources[i];
      const { perSource } = require("./perSource");
      await perSource(source, trigger);
    }
  } catch (e) {
    console.log({ e });
  }
  return;
}
