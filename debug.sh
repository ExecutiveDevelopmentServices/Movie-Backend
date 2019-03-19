 kill -usr1 $(lsof -i -P -n | grep movie-api | awk '{print $2}') &&  echo "$PORT connected"
