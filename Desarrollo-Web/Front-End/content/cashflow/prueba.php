<?php

/* establecer el limitador de caché a 'private' */

session_cache_limiter('private');
$cache_limiter = session_cache_limiter();

/* establecer la caducidad de la caché a 30 minutos */
session_cache_expire(3);
$cache_expire = session_cache_expire();

/* iniciar la sesión */

session_start();

echo "El limitador de caché ahora está establecido a $cache_limiter<br />";
echo "Las páginas de sesión examinadas caducan después de $cache_expire minutos";
?>