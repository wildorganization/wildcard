-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema bd_findup
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema bd_findup
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `bd_findup` DEFAULT CHARACTER SET utf8 ;
USE `bd_findup` ;

-- -----------------------------------------------------
-- Table `bd_findup`.`tb_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_usuarios` (
  `id_usuario` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(250) NULL,
  `sexo` CHAR(1) NULL,
  `email` VARCHAR(250) NULL,
  `descricao` LONGTEXT NULL,
  `login` VARCHAR(100) NULL,
  `senha` VARCHAR(100) NULL,
  `cidade` VARCHAR(150) NULL,
  `imagem` VARCHAR(500) NULL,
  PRIMARY KEY (`id_usuario`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_empresas` (
  `id_empresa` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(250) NULL,
  `descricao` VARCHAR(250) NULL,
  `coodernadas` VARCHAR(250) NULL,
  `horario_funcionamento` TIME NULL,
  `endereco` LONGTEXT NULL,
  `cidade` VARCHAR(150) NULL,
  `email` VARCHAR(250) NULL,
  `site` VARCHAR(250) NULL,
  `telefone` VARCHAR(100) NULL,
  PRIMARY KEY (`id_empresa`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_interesses`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_interesses` (
  `id_interesse` INT NOT NULL AUTO_INCREMENT,
  `tag` VARCHAR(150) NULL,
  PRIMARY KEY (`id_interesse`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_interesses_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_interesses_usuarios` (
  `id_interesse` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_interesse`, `id_usuario`),
  INDEX `fk_tb_interesses_has_tb_usuarios_tb_usuarios1_idx` (`id_usuario` ASC),
  INDEX `fk_tb_interesses_has_tb_usuarios_tb_interesses1_idx` (`id_interesse` ASC),
  UNIQUE INDEX `tb_usuarios_id_usuario_UNIQUE` (`id_usuario` ASC),
  CONSTRAINT `fk_tb_interesses_has_tb_usuarios_tb_interesses1`
    FOREIGN KEY (`id_interesse`)
    REFERENCES `bd_findup`.`tb_interesses` (`id_interesse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_interesses_has_tb_usuarios_tb_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bd_findup`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_interesses_empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_interesses_empresas` (
  `tb_interesses_id_interesse` INT NOT NULL,
  `tb_empresas_id_empresa` INT NOT NULL,
  PRIMARY KEY (`tb_interesses_id_interesse`, `tb_empresas_id_empresa`),
  INDEX `fk_tb_interesses_has_tb_empresas_tb_empresas1_idx` (`tb_empresas_id_empresa` ASC),
  INDEX `fk_tb_interesses_has_tb_empresas_tb_interesses1_idx` (`tb_interesses_id_interesse` ASC),
  CONSTRAINT `fk_tb_interesses_has_tb_empresas_tb_interesses1`
    FOREIGN KEY (`tb_interesses_id_interesse`)
    REFERENCES `bd_findup`.`tb_interesses` (`id_interesse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_interesses_has_tb_empresas_tb_empresas1`
    FOREIGN KEY (`tb_empresas_id_empresa`)
    REFERENCES `bd_findup`.`tb_empresas` (`id_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_imagens_empresas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_imagens_empresas` (
  `id_imagem` INT NOT NULL AUTO_INCREMENT,
  `id_empresa` INT NOT NULL,
  `imagem` VARCHAR(500) NULL,
  PRIMARY KEY (`id_imagem`, `id_empresa`),
  INDEX `fk_tb_imagens_empresas_tb_empresas1_idx` (`id_empresa` ASC),
  CONSTRAINT `fk_tb_imagens_empresas_tb_empresas1`
    FOREIGN KEY (`id_empresa`)
    REFERENCES `bd_findup`.`tb_empresas` (`id_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_eventos` (
  `id_evento` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(250) NULL,
  `descricao` VARCHAR(250) NULL,
  `coordenadas` VARCHAR(250) NULL,
  `horario` TIME NULL,
  `endereco` LONGTEXT NULL,
  `data` DATE NULL,
  `valor_ingresso` DOUBLE NULL,
  `imagem` VARCHAR(500) NULL,
  `status` INT ZEROFILL NULL,
  PRIMARY KEY (`id_evento`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_interesses_eventos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_interesses_eventos` (
  `id_interesse` INT NOT NULL,
  `id_evento` INT NOT NULL,
  PRIMARY KEY (`id_interesse`, `id_evento`),
  INDEX `fk_tb_interesses_has_tb_eventos_tb_eventos1_idx` (`id_evento` ASC),
  INDEX `fk_tb_interesses_has_tb_eventos_tb_interesses1_idx` (`id_interesse` ASC),
  CONSTRAINT `fk_tb_interesses_has_tb_eventos_tb_interesses1`
    FOREIGN KEY (`id_interesse`)
    REFERENCES `bd_findup`.`tb_interesses` (`id_interesse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_interesses_has_tb_eventos_tb_eventos1`
    FOREIGN KEY (`id_evento`)
    REFERENCES `bd_findup`.`tb_eventos` (`id_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_participacao_eventos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_participacao_eventos_usuarios` (
  `tb_eventos_id_evento` INT NOT NULL,
  `tb_usuarios_id_usuario` INT NOT NULL,
  PRIMARY KEY (`tb_eventos_id_evento`, `tb_usuarios_id_usuario`),
  INDEX `fk_tb_eventos_has_tb_usuarios_tb_usuarios1_idx` (`tb_usuarios_id_usuario` ASC),
  INDEX `fk_tb_eventos_has_tb_usuarios_tb_eventos1_idx` (`tb_eventos_id_evento` ASC),
  CONSTRAINT `fk_tb_eventos_has_tb_usuarios_tb_eventos1`
    FOREIGN KEY (`tb_eventos_id_evento`)
    REFERENCES `bd_findup`.`tb_eventos` (`id_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_eventos_has_tb_usuarios_tb_usuarios1`
    FOREIGN KEY (`tb_usuarios_id_usuario`)
    REFERENCES `bd_findup`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_likes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_likes` (
  `id_like` INT NOT NULL AUTO_INCREMENT,
  `id_empresa` INT NOT NULL,
  `tipo` INT NULL,
  PRIMARY KEY (`id_like`, `id_empresa`),
  INDEX `fk_tb_likes_tb_empresas1_idx` (`id_empresa` ASC),
  CONSTRAINT `fk_tb_likes_tb_empresas1`
    FOREIGN KEY (`id_empresa`)
    REFERENCES `bd_findup`.`tb_empresas` (`id_empresa`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_grupos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_grupos` (
  `id_grupo` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(250) NULL,
  `descricao` LONGTEXT NULL,
  `imagem` VARCHAR(500) NULL,
  `cidade` VARCHAR(150) NULL,
  PRIMARY KEY (`id_grupo`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_interesses_grupos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_interesses_grupos` (
  `id_interesse` INT NOT NULL,
  `id_grupo` INT NOT NULL,
  PRIMARY KEY (`id_interesse`, `id_grupo`),
  INDEX `fk_tb_interesses_has_tb_grupos_tb_grupos1_idx` (`id_grupo` ASC),
  INDEX `fk_tb_interesses_has_tb_grupos_tb_interesses1_idx` (`id_interesse` ASC),
  CONSTRAINT `fk_tb_interesses_has_tb_grupos_tb_interesses1`
    FOREIGN KEY (`id_interesse`)
    REFERENCES `bd_findup`.`tb_interesses` (`id_interesse`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_interesses_has_tb_grupos_tb_grupos1`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `bd_findup`.`tb_grupos` (`id_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_eventos_grupos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_eventos_grupos` (
  `id_evento` INT NOT NULL,
  `id_grupo` INT NOT NULL,
  PRIMARY KEY (`id_evento`, `id_grupo`),
  INDEX `fk_tb_eventos_has_tb_grupos_tb_grupos1_idx` (`id_grupo` ASC),
  INDEX `fk_tb_eventos_has_tb_grupos_tb_eventos1_idx` (`id_evento` ASC),
  CONSTRAINT `fk_tb_eventos_has_tb_grupos_tb_eventos1`
    FOREIGN KEY (`id_evento`)
    REFERENCES `bd_findup`.`tb_eventos` (`id_evento`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_eventos_has_tb_grupos_tb_grupos1`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `bd_findup`.`tb_grupos` (`id_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_forum`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_forum` (
  `id_forum` INT NOT NULL AUTO_INCREMENT,
  `titulo_topico` VARCHAR(250) NULL,
  PRIMARY KEY (`id_forum`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_grupos_forum`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_grupos_forum` (
  `id_grupo` INT NOT NULL,
  `id_forum` INT NOT NULL,
  PRIMARY KEY (`id_grupo`, `id_forum`),
  INDEX `fk_tb_grupos_has_tb_forum_tb_forum1_idx` (`id_forum` ASC),
  INDEX `fk_tb_grupos_has_tb_forum_tb_grupos1_idx` (`id_grupo` ASC),
  CONSTRAINT `fk_tb_grupos_has_tb_forum_tb_grupos1`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `bd_findup`.`tb_grupos` (`id_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_grupos_has_tb_forum_tb_forum1`
    FOREIGN KEY (`id_forum`)
    REFERENCES `bd_findup`.`tb_forum` (`id_forum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_mensagens_forun`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_mensagens_forun` (
  `id_msg_forun` INT NOT NULL AUTO_INCREMENT,
  `id_forum` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  `mensagem` LONGTEXT NULL,
  `status` INT ZEROFILL NULL,
  PRIMARY KEY (`id_msg_forun`, `id_forum`, `id_usuario`),
  INDEX `fk_tb_mensagens_forun_tb_forum1_idx` (`id_forum` ASC),
  INDEX `fk_tb_mensagens_forun_tb_usuarios1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_tb_mensagens_forun_tb_forum1`
    FOREIGN KEY (`id_forum`)
    REFERENCES `bd_findup`.`tb_forum` (`id_forum`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_mensagens_forun_tb_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bd_findup`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_usuarios_amigos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_usuarios_amigos` (
  `id_usuario` INT NOT NULL,
  `id_amigo` INT NOT NULL,
  PRIMARY KEY (`id_usuario`, `id_amigo`),
  INDEX `fk_tb_usuarios_has_tb_usuarios_tb_usuarios2_idx` (`id_amigo` ASC),
  INDEX `fk_tb_usuarios_has_tb_usuarios_tb_usuarios1_idx` (`id_usuario` ASC),
  CONSTRAINT `fk_tb_usuarios_has_tb_usuarios_tb_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bd_findup`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_usuarios_has_tb_usuarios_tb_usuarios2`
    FOREIGN KEY (`id_amigo`)
    REFERENCES `bd_findup`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `bd_findup`.`tb_grupos_usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `bd_findup`.`tb_grupos_usuarios` (
  `id_grupo` INT NOT NULL,
  `id_usuario` INT NOT NULL,
  PRIMARY KEY (`id_grupo`, `id_usuario`),
  INDEX `fk_tb_grupos_has_tb_usuarios_tb_usuarios1_idx` (`id_usuario` ASC),
  INDEX `fk_tb_grupos_has_tb_usuarios_tb_grupos1_idx` (`id_grupo` ASC),
  CONSTRAINT `fk_tb_grupos_has_tb_usuarios_tb_grupos1`
    FOREIGN KEY (`id_grupo`)
    REFERENCES `bd_findup`.`tb_grupos` (`id_grupo`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_tb_grupos_has_tb_usuarios_tb_usuarios1`
    FOREIGN KEY (`id_usuario`)
    REFERENCES `bd_findup`.`tb_usuarios` (`id_usuario`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
