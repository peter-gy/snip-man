#!/bin/sh

# Clean all the non-source files
find activities -mindepth 1 -not -name "*.md" -delete

# Collect the source .md files into an array
IFS=$'\n'
# Array of ./dirname/filename.md
uml_preview_paths=($(find activities -mindepth 1 -name "*.md" -type f))
unset IFS

for path in "${uml_preview_paths[@]}"
do
    dirname=$(dirname -- "$path")
    filename_with_ext=$(basename -- "$path")
    filename="${filename_with_ext%.*}"
    plantuml_path="${dirname}/${filename}.puml"
    # Create ${filename}.puml from the md file
    cat "$path" | sed '1,1d; $d' >> "$plantuml_path"
    # Generate the diagrams from ${filename}.puml (png, then svg)
    plantuml "$plantuml_path"
    plantuml -tsvg "$plantuml_path"
done