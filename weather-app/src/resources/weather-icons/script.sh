#!/bin/bash
# This script will take an animated GIF and delete every other frame
# Accepts two parameters: input file and output file
# Usage: ./<scriptfilename> input.gif output.gif

# NOTE : Quote it else use array to avoid problems #
FILENAMES=`ls ./*.gif`
for entry in $FILENAMES
do
  echo "Processing $entry file..."
  ## Get the number of frames for the file
  #NUM_FRAMES=gifsicle $entry -I | grep "image #\d*" --count
  #CUMULATIVE_DELAY=gifsicle $entry -I | awk '{s+=$1} END {print s}'
  #AVERAGE_DELAY=echo "100 * $CUMULATIVE_DELAY / $NUM_FRAMES" | bc -l
  ### cut number of frames in half
  #gifsicle --colors 256 -d $AVERAGE_DELAY -U $entry seq -f "#%g" 0 2 $NUM_FRAMES -O2 -o "temp_file.gif"
  #gifsicle -O3 --lossy=80 "temp_file.gif" -o "temp_file1.gif"
  #mv "temp_file1.gif" $entry
  #rm "temp_file.gif"
  gifsicle -O3 --lossy=500 $entry -o "temp_file.gif"
  mv "temp_file.gif" $entry
  echo "done"
done
