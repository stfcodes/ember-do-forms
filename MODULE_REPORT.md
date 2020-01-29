## Module Report
### Unknown Global

**Global**: `Ember.mixin`

**Location**: `addon/components/do-field.js` at line 14

```js

const {
  mixin
} = Ember;

```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-control-test.js` at line 15

```js

  hooks.beforeEach(function() {
    onError = Ember.onerror;
    this.config = this.owner.lookup('service:ember-do-forms/config');
  });
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-control-test.js` at line 20

```js

  hooks.afterEach(function() {
    Ember.onerror = onError;
  });

```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-control-test.js` at line 32

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: Could not find component named "one-way-nonexistent" (no component or template with that name was found)');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-fields-test.js` at line 14

```js

  hooks.beforeEach(function() {
    onError = Ember.onerror;

    this.config = this.owner.lookup('service:ember-do-forms/config');
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-fields-test.js` at line 25

```js

  hooks.afterEach(function() {
    Ember.onerror = onError;
  });

```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-fields-test.js` at line 31

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{do-fields}} requires an object to be passed in.');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-form-test.js` at line 15

```js

  hooks.beforeEach(function() {
    onError = Ember.onerror;

    this.config = this.owner.lookup('service:ember-do-forms/config');
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-form-test.js` at line 36

```js

  hooks.afterEach(function() {
    Ember.onerror = onError;
    this.owner.unregister('component:test-component');
  });
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-form-test.js` at line 43

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{do-form}} requires an object to be passed in.');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-field-test.js` at line 15

```js

  hooks.beforeEach(function() {
    onError = Ember.onerror;

    this.config = this.owner.lookup('service:ember-do-forms/config');
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-field-test.js` at line 29

```js

  hooks.afterEach(function() {
    Ember.onerror = onError;
    this.owner.unregister('component:test-component');
  });
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-field-test.js` at line 36

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{do-field}} requires an object to be passed in');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/do-field-test.js` at line 45

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{do-field}} requires a propertyName to be passed in');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/checkbox-field-test.js` at line 14

```js

  hooks.beforeEach(function() {
    onError = Ember.onerror;

    this.config = this.owner.lookup('service:ember-do-forms/config');
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/checkbox-field-test.js` at line 25

```js

  hooks.afterEach(function() {
    Ember.onerror = onError;
  });

```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/checkbox-field-test.js` at line 31

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{ember-do-forms/checkbox-field}} requires an object to be passed in');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/checkbox-field-test.js` at line 41

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{ember-do-forms/checkbox-field}} requires a propertyName to be passed in');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/input-field-test.js` at line 15

```js

  hooks.beforeEach(function() {
    onError = Ember.onerror;

    this.config = this.owner.lookup('service:ember-do-forms/config');
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/input-field-test.js` at line 25

```js

  hooks.afterEach(function() {
    Ember.onerror = onError;
  });

```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/input-field-test.js` at line 31

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{ember-do-forms/input-field}} requires an object to be passed in');
    };
```

### Unknown Global

**Global**: `Ember.onerror`

**Location**: `tests/integration/components/ember-do-forms/input-field-test.js` at line 41

```js
    assert.expect(1);

    Ember.onerror = function(error) {
      assert.equal(error.message, 'Assertion Failed: {{ember-do-forms/input-field}} requires a propertyName to be passed in');
    };
```
