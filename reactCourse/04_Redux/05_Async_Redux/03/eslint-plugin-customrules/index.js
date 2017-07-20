module.exports = {
    rules: {
        'use-for': function(context) {
            return {
                ForStatement: function(node) {
                    if (node.test && node.test.right && node.test.right.property && node.test.right.property.name === 'length') {
                        context.report(node, 'Use map or forEach instead of for loop');
                    }
                }
            };
        }
    }
};
