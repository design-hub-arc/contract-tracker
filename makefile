BUILD_DIR := build/
SRC_DIR := src/


### Build directory tree before populating with files
SRC_DIR_DIRS = $(shell find $(SRC_DIR) -type d)
BUILD_DIR_DIRS = $(shell python3 helpers/changeroot.py $(BUILD_DIR) $(SRC_DIR_DIRS))

$(BUILD_DIR_DIRS): $(SRC_DIR_DIRS)
	mkdir -p $(BUILD_DIR_DIRS)

#### Get list of src files
### css/
## *.css
CSS_SRC_DIR := $(SRC_DIR)css/
CSS_SRC_FILES := $(shell find $(CSS_SRC_DIR) -type f -name *.css)
CSS_BUILD_FILES := $(shell python3 helpers/changeroot.py $(BUILD_DIR) $(CSS_SRC_FILES))

# Copy .css files to the build directory
$(CSS_BUILD_FILES): $(CSS_SRC_FILES) $(BUILD_DIR_DIRS)
	cp $(shell python3 helpers/changeroot.py $(SRC_DIR) $@) $@


## *.scss
SCSS_SRC_DIR := $(SRC_DIR)css/
SCSS_SRC_FILES := $(shell find $(SCSS_SRC_DIR) -type f -name *.scss)
SCSS_BUILD_FILES :=

# Compile .scss files into .css files in the build directory


### html/
## *.html
HTML_SRC_DIR := $(SRC_DIR)html/
HTML_SRC_FILES := $(shell find $(HTML_SRC_DIR) -type f -name *.html)
HTML_BUILD_FILES :=

# Copy .html files to the build directory


## *.ejs
EJS_SRC_DIR := $(SRC_DIR)html/
EJS_SRC_FILES := $(shell find $(EJS_SRC_DIR) -type f -name *.ejs)
EJS_BUILD_FILES :=

# Compile .ejs files to .html files in the build directory


### js/
## *.js
JS_SRC_DIR := $(SRC_DIR)js/
JS_SRC_FILES := $(shell find $(JS_SRC_DIR) -type f -name *.js)
JS_BUILD_FILES :=

# Copy .js files to the build directory


## *.coffee
COFFEE_SRC_DIR := $(SRC_DIR)js/
COFFEE_SRC_FILES := $(shell find $(COFFEE_SRC_DIR) -type f -name *.coffee)
COFFEE_BUILD_FILES :=

# Compile .coffee files to .js files in the build directory


### server/html
## server/*.html
SERVER_HTML_SRC_DIR := $(SRC_DIR)server/ejs/
SERVER_HTML_SRC_FILES := $(shell find $(SERVER_HTML_SRC_DIR) -type f -name *.html)
SERVER_HTML_BUILD_FILES :=

# Copy server .html files to the build directory


## server/*.ejs
SERVER_EJS_SRC_DIR := $(SRC_DIR)server/ejs/
SERVER_EJS_SRC_FILES := $(shell find $(SERVER_EJS_SRC_DIR) -type f -name *.ejs)
SERVER_EJS_BUILD_FILES :=

# Copy server .ejs files to the build directory


### server/js
## server/*.js
SERVER_JS_SRC_DIR := $(SRC_DIR)server/js/
SERVER_JS_SRC_FILES := $(shell find $(SERVER_JS_SRC_DIR) -type f -name *.js)
SERVER_JS_BUILD_FILES :=

# Copy server .js files to the build directory


## server/*.coffee
SERVER_COFFEE_SRC_DIR := $(SRC_DIR)server/js/
SERVER_COFFEE_SRC_FILES := $(shell find $(SERVER_COFFEE_SRC_DIR) -type f -name *.coffee)
SERVER_COFFEE_BUILD_FILES :=

# Compile server .coffee files to .js files in the build directory


### static/
## *
STATIC_SRC_DIR := $(SRC_DIR)/static/
STATIC_SRC_FILES := $(shell find $(STATIC_SRC_DIR) -type f)
STATIC_BUILD_FILES :=

# Copy all files to the build directory

### Special Rules
all: $(CSS_BUILD_FILES)

clean:
	rm -rf $(BUILD_DIR)

.PHONY: all clean
.DEFAULT_GOAL := all

