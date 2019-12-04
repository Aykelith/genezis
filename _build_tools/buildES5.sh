#!/bin/bash
npx babel \
	-d _es5 \
	--no-babelrc \
	--delete-dir-on-start \
	--ignore _build_tools,benchmark,node_modules \
	--delete-dir-on-start \
	./