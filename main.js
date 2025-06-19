import * as Blockly from 'blockly';
import {pythonGenerator} from 'blockly/python';
import { registerContinuousToolbox } from '@blockly/continuous-toolbox';

registerContinuousToolbox();

// Your custom block definition (make sure this is before generator)

Blockly.Blocks['logic_compare'] = {
  init: function() {
    this.appendValueInput('A')
        .setCheck(null)
    this.appendValueInput('B')
        .setCheck(null)
        .appendField(new Blockly.FieldDropdown([
          ['=', 'EQ'],
          ['\u2260', 'NEQ'],
          ['<', 'LT'],
          ['\u2264', 'LTE'],
          ['>', 'GT'],
          ['\u2265', 'GTE']
        ]), 'OP');
    this.setInputsInline(true);
    this.setOutput(true, 'Boolean');
    this.setStyle('logic_blocks');
    this.setTooltip('Compare two values.');
    this.setHelpUrl('');

    // Default shadows for inputs to avoid empty slots
    const shadowA = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM"></field>
      </shadow>
    `);
    this.getInput('A').connection.setShadowDom(shadowA);

    const shadowB = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM"></field>
      </shadow>
    `);
    this.getInput('B').connection.setShadowDom(shadowB);
  }
};

Blockly.Blocks['print'] = {
  init: function() {
    this.appendValueInput('TEXT')
        .setCheck('String')
        .appendField('print');
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setStyle('text_blocks');
    this.setTooltip('Print text to the console');
    this.setHelpUrl('');

    // Use custom_text shadow so it shows a text input by default without quotes visible
    const shadowPrint = Blockly.utils.xml.textToDom(`
      <shadow type="custom_text">
        <field name="TEXT"></field>
      </shadow>
    `);
    this.getInput("TEXT").connection.setShadowDom(shadowPrint);
  }
};

Blockly.Blocks['boolean_input'] = {
  init: function() {
    this.appendValueInput("BOOL")
        .setCheck("Boolean")

    this.setOutput(true, "Boolean");
    this.setStyle('logic_blocks');

    // Add a shadow block with dropdown
    const shadowBlock = Blockly.utils.xml.textToDom(`
      <shadow type="boolean_dropdown">
        <field name="BOOL">TRUE</field>
      </shadow>
    `);
    this.getInput("BOOL").connection.setShadowDom(shadowBlock);
  }
};

Blockly.Blocks['boolean_dropdown'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["True", "TRUE"],
        ["False", "FALSE"]
      ]), "BOOL");
    this.setOutput(true, "Boolean");
    this.setStyle("logic_blocks");
  }
};

Blockly.Blocks['loop_continue'] = {
  init: function() {
    this.appendDummyInput().appendField("continue");
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setStyle('logic_blocks');
    this.setTooltip("Skip the rest of the loop iteration.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['loop_break'] = {
  init: function() {
    this.appendDummyInput().appendField("break");
    this.setPreviousStatement(true, null);
    this.setNextStatement(false, null);
    this.setStyle('logic_blocks');
    this.setTooltip("Exit the current loop.");
    this.setHelpUrl("");
  }
};

Blockly.Blocks['custom_while_loop'] = {
  init: function() {
    this.appendValueInput("COND")
        .setCheck("Boolean")
        .appendField("while");
    this.appendStatementInput("BODY")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setStyle('logic_blocks');
    this.setTooltip("Python while-loop");
    this.setHelpUrl("");

    // Shadow block for COND input default to TRUE
    const shadowCond = Blockly.utils.xml.textToDom(`
      <shadow type="boolean_dropdown">
        <field name="BOOL">TRUE</field>
      </shadow>
    `);
    this.getInput("COND").connection.setShadowDom(shadowCond);
  }
};

Blockly.Blocks['custom_for_loop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("for")
        .appendField(new Blockly.FieldVariable("i"), "VAR")
        .appendField("in");
    this.appendValueInput("ITERABLE")
        .setCheck(null);
    this.appendStatementInput("BODY")
        .setCheck(null)
        .appendField("do");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setInputsInline(true);
    this.setStyle('logic_blocks');
    this.setTooltip("Python for-loop");
    this.setHelpUrl("");

    // Shadow block for ITERABLE (text input with default "range(10)")
    const shadowIterable = Blockly.utils.xml.textToDom(`
      <shadow type="custom_text">
        <field name="TEXT"></field>
      </shadow>
    `);
    this.getInput("ITERABLE").connection.setShadowDom(shadowIterable);
  }
};

Blockly.Blocks['logic_binary'] = {
  init: function() {
    this.appendValueInput('A')
      .setCheck('Boolean');

    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['AND', 'AND'],
        ['OR', 'OR']
      ]), 'OP');

    this.appendValueInput('B')
      .setCheck('Boolean');

    this.setOutput(true, 'Boolean');
    this.setInputsInline(true);
    this.setStyle('logic_blocks');
    this.setTooltip('Logical AND or OR operation');

    // Shadow for input A with default true boolean block
    const shadowA = Blockly.utils.xml.textToDom(`
      <shadow type="boolean_dropdown">
        <field name="BOOL">TRUE</field>
      </shadow>
    `);
    this.getInput('A').connection.setShadowDom(shadowA);

    // Shadow for input B with default true boolean block
    const shadowB = Blockly.utils.xml.textToDom(`
      <shadow type="boolean_dropdown">
        <field name="BOOL">TRUE</field>
      </shadow>
    `);
    this.getInput('B').connection.setShadowDom(shadowB);
  }
};

Blockly.Blocks['logic_not'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("NOT");
    this.appendValueInput('BOOL')
      .setCheck('Boolean');

    this.setOutput(true, 'Boolean');
    this.setInputsInline(true);
    this.setStyle('logic_blocks');
    this.setTooltip('Logical NOT operation');

    // Shadow block for BOOL input default to TRUE
    const shadowBool = Blockly.utils.xml.textToDom(`
      <shadow type="boolean_dropdown">
        <field name="BOOL">TRUE</field>
      </shadow>
    `);
    this.getInput('BOOL').connection.setShadowDom(shadowBool);
  }
};

Blockly.Blocks['comment'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Comment");
    this.appendValueInput('COMMENT')
        .setCheck('String');

    this.setStyle('text_blocks');
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setTooltip("A comment block to help document your code.");
    this.setHelpUrl("");

    // Use the custom_text shadow instead of 'text' block
    const shadowComment = Blockly.utils.xml.textToDom(`
      <shadow type="custom_text">
        <field name="TEXT"></field>
      </shadow>
    `);
    this.getInput("COMMENT").connection.setShadowDom(shadowComment);
  }
};

Blockly.Blocks['input'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Input");
    this.appendValueInput('PROMPT')
        .setCheck('String');

    this.setOutput(true, "String");
    this.setTooltip("Takes user input as a string");
    this.setStyle('text_blocks');
    this.setInputsInline(true);
    this.setHelpUrl("");

    // Use the custom_text shadow instead of 'text' block
    const shadowPrompt = Blockly.utils.xml.textToDom(`
      <shadow type="custom_text">
        <field name="TEXT"></field>
      </shadow>
    `);
    this.getInput("PROMPT").connection.setShadowDom(shadowPrompt);
  }
};

Blockly.Blocks['custom_text'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldTextInput(''), 'TEXT');
    this.setOutput(true, 'String');
    this.setTooltip('Enter some text');
    this.setStyle('text_blocks');
  }
};

Blockly.Blocks['math_operator'] = {
  init: function() {
    this.appendValueInput("A").setCheck("Number");
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ['+', 'ADD'],
        ['-', 'MINUS'],
        ['×', 'MULTIPLY'],
        ['÷', 'DIVIDE'],
        ['%', 'MOD']
      ]), "OP");
    this.appendValueInput("B").setCheck("Number");

    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle('math_blocks');
    this.setTooltip("Performs a math operation");

    // Shadow blocks for A and B (acts like default number input)
    const shadowA = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);
    const shadowB = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);

    this.getInput("A").connection.setShadowDom(shadowA);
    this.getInput("B").connection.setShadowDom(shadowB);
  }
};

Blockly.Blocks['math_unary'] = {
  init: function() {
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([
        ["abs", "ABS"],
        ["sin", "SIN"],
        ["cos", "COS"],
        ["tan", "TAN"],
        ["atan", "ATAN"],
      ]), "OP");
    this.appendValueInput("NUM")
      .setCheck("Number");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle('math_blocks');
    this.setTooltip("Apply a math function to a number");

    // Shadow block for NUM input
    const shadowNum = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);
    this.getInput("NUM").connection.setShadowDom(shadowNum);
  }
};

Blockly.Blocks['math_random_range'] = {
  init: function() {
    this.appendValueInput("FROM")
        .setCheck("Number")
        .appendField("random ");
    this.appendValueInput("TO")
        .setCheck("Number")
        .appendField("to");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle('math_blocks');
    this.setTooltip("Random number between two values");

    // Add shadow blocks for FROM and TO inputs
    const shadowFrom = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);
    this.getInput("FROM").connection.setShadowDom(shadowFrom);

    const shadowTo = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);
    this.getInput("TO").connection.setShadowDom(shadowTo);
  }
};

Blockly.Blocks['math_round_places'] = {
  init: function() {
    this.appendValueInput("NUM")
        .setCheck("Number")
        .appendField("round");
    this.appendValueInput("PLACES")
        .setCheck("Number")
        .appendField("places");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setStyle('math_blocks');
    this.setTooltip("Round a number to specified decimal places");

    // Default shadows so inputs aren't empty by default
    const shadowNum = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);
    this.getInput("NUM").connection.setShadowDom(shadowNum);

    const shadowPlaces = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);
    this.getInput("PLACES").connection.setShadowDom(shadowPlaces);
  }
};

Blockly.Blocks['math_convert'] = {
  init: function() {
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([
          ["int", "int"],
          ["float", "float"],
          ["str", "str"],
          ["bool", "bool"],
        ]), "TYPE");
    this.appendValueInput("VALUE")
        .setCheck(null);
    this.setInputsInline(true);
    this.setOutput(true, null);
    this.setStyle('math_blocks');
    this.setTooltip("Convert value to specified type");

    // Add shadow block for VALUE input so it starts with a number input 0
    const shadowValue = Blockly.utils.xml.textToDom(`
      <shadow type="math_number">
        <field name="NUM">0</field>
      </shadow>
    `);
    this.getInput("VALUE").connection.setShadowDom(shadowValue);
  }
};

const pygen = 1

pythonGenerator['logic_compare'] = function(block) {
  const OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  const op = OPERATORS[block.getFieldValue('OP')];
  const A = pythonGenerator.valueToCode(block, 'A', pythonGenerator.ORDER_RELATIONAL) || '0';
  const B = pythonGenerator.valueToCode(block, 'B', pythonGenerator.ORDER_RELATIONAL) || '0';
  const code = `${A} ${op} ${B}`;
  return [code, pythonGenerator.ORDER_RELATIONAL];
};

pythonGenerator.forBlock['print'] = function(block) {
  const text = pythonGenerator.valueToCode(block, 'TEXT', pythonGenerator.ORDER_NONE) || "''";
  const code = `print(${text})\n`;
  return code;
};

pythonGenerator.forBlock['boolean_dropdown'] = function(block) {
  return [block.getFieldValue("BOOL") === "TRUE" ? "True" : "False", pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['boolean_input'] = function(block) {
  const value = pythonGenerator.valueToCode(block, "BOOL", pythonGenerator.ORDER_ATOMIC) || "False";
  return [value, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['boolean_dropdown'] = function (block) {
  const value = block.getFieldValue('BOOL');
  const code = (value === 'TRUE') ? 'True' : 'False';
  return [code, pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['loop_continue'] = function(block) {
  return 'continue\n';
};

pythonGenerator.forBlock['loop_break'] = function(block) {
  return 'break\n';
};

pythonGenerator.forBlock['custom_while_loop'] = function(block) {
  const condition = pythonGenerator.valueToCode(block, 'COND', pythonGenerator.ORDER_NONE) || 'True';
  const body = pythonGenerator.statementToCode(block, 'BODY');
  const code = `while ${condition}:\n${body}`;
  return code;
};

pythonGenerator.forBlock['custom_for_loop'] = function(block) {
  const variable = pythonGenerator.nameDB_.getName(block.getFieldValue('VAR'), Blockly.VARIABLE_CATEGORY_NAME);
  const iterable = pythonGenerator.valueToCode(block, 'ITERABLE', pythonGenerator.ORDER_NONE) || '[]';
  const statements = pythonGenerator.statementToCode(block, 'BODY');
  const code = `for ${variable} in ${iterable}:\n${statements}`;
  return code;
};

pythonGenerator.forBlock['logic_not'] = function(block) {
  const bool = pythonGenerator.valueToCode(block, 'BOOL', pythonGenerator.ORDER_LOGICAL_NOT) || 'False';
  const code = `not ${bool}`;
  return [code, pythonGenerator.ORDER_LOGICAL_NOT];
};

pythonGenerator.forBlock['logic_binary'] = function(block) {
  const a = pythonGenerator.valueToCode(block, 'A', pythonGenerator.ORDER_LOGICAL_AND) || 'False';
  const b = pythonGenerator.valueToCode(block, 'B', pythonGenerator.ORDER_LOGICAL_AND) || 'False';
  const op = block.getFieldValue('OP');
  const operator = (op === 'AND') ? 'and' : 'or';
  const code = `${a} ${operator} ${b}`;
  const order = (operator === 'and') ? pythonGenerator.ORDER_LOGICAL_AND : pythonGenerator.ORDER_LOGICAL_OR;
  return [code, order];
};

pythonGenerator.forBlock['comment'] = function(block) {
  const comment = pythonGenerator.valueToCode(block, 'COMMENT', pythonGenerator.ORDER_NONE) || "''";
  const cleanedComment = comment.replace(/^['"]|['"]$/g, '');
  const code = `# ${cleanedComment}\n`;
  return code;
};

pythonGenerator.forBlock['input'] = function(block) {
  const prompt = pythonGenerator.valueToCode(block, 'PROMPT', pythonGenerator.ORDER_NONE) || "''";
  const code = `input(${prompt})`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['custom_text'] = function(block) {
  const text = block.getFieldValue('TEXT');
  // Output as a Python string literal (with quotes)
  return [pythonGenerator.quote_(text), pythonGenerator.ORDER_ATOMIC];
};

pythonGenerator.forBlock['math_operator'] = function(block, generator) {
  const a = pythonGenerator.valueToCode(block, 'A', pythonGenerator.ORDER_MULTIPLICATIVE) || '0';
  const b = pythonGenerator.valueToCode(block, 'B', pythonGenerator.ORDER_MULTIPLICATIVE) || '0';
  const op = block.getFieldValue('OP');

  let operator;
  switch(op) {
    case 'ADD': operator = '+'; break;
    case 'MINUS': operator = '-'; break;
    case 'MULTIPLY': operator = '*'; break;
    case 'DIVIDE': operator = '/'; break;
    case 'MOD': operator = '%'; break;
    default: operator = '+';
  }

  const order = (operator === '+' || operator === '-') ?
                pythonGenerator.ORDER_ADDITIVE :
                pythonGenerator.ORDER_MULTIPLICATIVE;

  const code = `${a} ${operator} ${b}`;
  return [code, order];
};

pythonGenerator.forBlock['math_unary'] = function(block) {
  const num = pythonGenerator.valueToCode(block, 'NUM', pythonGenerator.ORDER_NONE) || '0';
  const op = block.getFieldValue('OP').toLowerCase();

  // For Python math module functions, map names to math.func
  const mathOps = ['abs', 'sin', 'cos', 'tan', 'atan'];
  let code = '';

  if (mathOps.includes(op)) {
    if (op === 'abs') {
      code = `abs(${num})`;
    } else {
      code = `math.${op}(${num})`;
    }
  } else {
    code = num; // fallback, shouldn't happen
  }

  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['math_random_range'] = function(block) {
  const fromVal = pythonGenerator.valueToCode(block, 'FROM', pythonGenerator.ORDER_NONE) || '0';
  const toVal = pythonGenerator.valueToCode(block, 'TO', pythonGenerator.ORDER_NONE) || '0';
  const code = `random.uniform(${fromVal}, ${toVal})`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['math_round_places'] = function(block) {
  const num = pythonGenerator.valueToCode(block, 'NUM', pythonGenerator.ORDER_NONE) || '0';
  const places = pythonGenerator.valueToCode(block, 'PLACES', pythonGenerator.ORDER_NONE) || '0';
  const code = `round(${num}, ${places})`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

pythonGenerator.forBlock['math_convert'] = function(block) {
  const value = pythonGenerator.valueToCode(block, 'VALUE', pythonGenerator.ORDER_NONE) || '0';
  const type = block.getFieldValue('TYPE');
  const code = `${type}(${value})`;
  return [code, pythonGenerator.ORDER_FUNCTION_CALL];
};

// Theme setup (same as yours)
const darkZelos = Blockly.Theme.defineTheme('dark_zelos', {
  base: Blockly.Themes.Zelos,
  blockStyles: {
    logic_blocks: {
      colourPrimary: '#ffab19',    // main block color
      colourSecondary: '#cf8b17',  // darker border/shadow
      colourTertiary: '#cf8b17',   // lighter highlights
    },
    text_blocks: {
      colourPrimary: '#5cb1d6',
      colourSecondary: '#2e8eb8',
      colourTertiary: '#2e8eb8',
    },
},
  categoryStyles: Blockly.Themes.Zelos.categoryStyles,
  componentStyles: {
    workspaceBackgroundColour: '#1e1e1e',
    toolboxBackgroundColour: '#333333',
    toolboxForegroundColour: '#ffffff',
    flyoutBackgroundColour: '#2a2a2a',
    flyoutForegroundColour: '#ffffff',
    scrollbarColour: '#888888',
    scrollbarHoverColour: '#cccccc',
    insertionMarkerColour: '#ffffff',
    insertionMarkerOpacity: 0.3,
    markerColour: '#ffffff',
    cursorColour: '#ffffff',
  },
  fontStyle: Blockly.Themes.Zelos.fontStyle,
  startHats: Blockly.Themes.Zelos.startHats,
});

let currentRenderer = 'zelos'; // default
let savedWorkspaceXml = null;

// Inject Blockly
let workspace = Blockly.inject('blocklyDiv', {
  toolbox: document.getElementById('toolbox'),
  theme: darkZelos,
  renderer: 'zelos',
  plugins: {
    flyoutsVerticalToolbox: 'ContinuousFlyout',
    metricsManager: 'ContinuousMetrics',
    toolbox: 'ContinuousToolbox',
  },
});

function reinjectWorkspace(newRenderer) {
  // Save current workspace state
  savedWorkspaceXml = Blockly.utils.xml.workspaceToDom(workspace);
  workspace.dispose(); // kill the old one

  // Inject new workspace with the new renderer
  workspace = Blockly.inject('blocklyDiv', {
    toolbox: document.getElementById('toolbox'),
    theme: darkZelos, // or whatever theme you’re using
    renderer: newRenderer,
    plugins: {
      flyoutsVerticalToolbox: 'ContinuousFlyout',
      metricsManager: 'ContinuousMetrics',
      toolbox: 'ContinuousToolbox',
    },
  });

  // Load saved blocks back in
  BlocklyXml.domToWorkspace(savedWorkspaceXml, workspace);
}

document.getElementById('rendererSelect').addEventListener('change', (e) => {
  const newRenderer = e.target.value;
  if (newRenderer !== currentRenderer) {
    currentRenderer = newRenderer;
    reinjectWorkspace(newRenderer);
  }
});

const newToolbox = document.getElementById('toolbox');
workspace.updateToolbox(newToolbox);

// Save button handler
document.getElementById('saveBtn').addEventListener('click', () => {
  try {
    let code = pythonGenerator.workspaceToCode(workspace);
    if (!code.trim()) {
      alert("No code to save!");
    } else {
        // 👇 Add your custom line here
        let imports = "import random\nimport math"
        const header = `# Auto-generated with Blockly Python\n${imports}\n\n`;
        code = header + code;
        const blob = new Blob([code], { type: 'text/plain' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'blockly_code.py';
        a.click();
        URL.revokeObjectURL(a.href);
    }
  } catch (e) {
    alert("Code generation error: " + e.message);
  }
});

// Save Python code
document.getElementById('saveBtn').addEventListener('click', () => {
  try {
    let code = pythonGenerator.workspaceToCode(workspace);
    if (!code.trim()) return alert("No code to save!");

    let imports = "";
    const blocks = workspace.getAllBlocks(false);
    if (blocks.some(b => b.type === "math_random_range")) imports += "import random\n";
    if (blocks.some(b => b.type.startsWith("math_"))) imports += "import math\n";
    
    const header = `# Auto-generated with Blockly Python\n${imports}\n`;
    code = header + code;

    const blob = new Blob([code], { type: 'text/plain' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'blockly_code.py';
    a.click();
    URL.revokeObjectURL(a.href);
  } catch (e) {
    alert("Code generation error: " + e.message);
  }
});

// Save workspace XML as .pyblx
document.getElementById('exportPyblxBtn').addEventListener('click', () => {
  const xml = Blockly.Xml.workspaceToDom(workspace);
  const xmlText = Blockly.Xml.domToPrettyText(xml);
  const blob = new Blob([xmlText], { type: 'text/xml' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'workspace.pyblx';
  a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
});

// Load .pyblx
document.getElementById('importPyblxInput').addEventListener('change', () => {
  const fileInput = document.getElementById('importPyblxInput');
  const file = fileInput.files[0];
  if (!file) return alert("Please choose a .pyblx file.");
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const xml = Blockly.Xml.textToDom(e.target.result);
      Blockly.clearWorkspaceAndLoadFromXml(xml, workspace);
      alert("Workspace imported successfully!");
    } catch (err) {
      alert("Failed to import workspace: " + err.message);
    }
  };
  reader.readAsText(file);
  
  // Reset input so same file can be selected again
  fileInput.value = '';
});